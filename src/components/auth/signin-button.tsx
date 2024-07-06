import {
  useProfile,
  useSignIn,
  type AuthClientError,
  type StatusAPIResponse,
  type UseSignInArgs,
} from "@farcaster/auth-kit";
import * as React from "react";
import { QRCodeDialog } from "./qrcode-dialog";
import { Button } from "../ui/button";
import Image from "next/image";
import { ProfileButton } from "./profile-button";
import { isMobile } from "@/lib/helpers/responsive";

interface Props extends UseSignInArgs {
  onSignOut?: () => void;
  debug?: boolean;
  hideSignOut?: boolean;
}

export const SignInButton: React.FC<Props> = ({
  debug,
  hideSignOut,
  onSignOut,
  ...signInArgs
}) => {
  const { isAuthenticated } = useProfile();
  const { onSuccess, onStatusResponse, onError } = signInArgs;

  const onSuccessCallback = React.useCallback(
    (res: StatusAPIResponse) => {
      onSuccess?.(res);
    },
    [onSuccess],
  );

  const onStatusCallback = React.useCallback(
    (res: StatusAPIResponse) => {
      onStatusResponse?.(res);
    },
    [onStatusResponse],
  );

  const onErrorCallback = React.useCallback(
    (error?: AuthClientError) => {
      onError?.(error);
    },
    [onError],
  );

  const onSignOutCallback = React.useCallback(() => {
    onSignOut?.();
  }, [onSignOut]);

  const signInState = useSignIn({
    ...signInArgs,
    onSuccess: onSuccessCallback,
    onStatusResponse: onStatusCallback,
    onError: onErrorCallback,
  });

  const {
    signIn,
    signOut,
    connect,
    reconnect,
    isSuccess,
    isError,
    error,
    channelToken,
    url,
    data,
    validSignature,
  } = signInState;

  const handleSignOut = React.useCallback(() => {
    setShowDialog(false);
    signOut();
    onSignOutCallback();
  }, [signOut, onSignOutCallback]);

  const [showDialog, setShowDialog] = React.useState(false);

  const onClick = React.useCallback(() => {
    if (isError) {
      reconnect();
    }
    setShowDialog(true);
    signIn();
    if (url && isMobile()) {
      window.location.href = url;
    }
  }, [isError, reconnect, signIn, url]);

  const authenticated = isSuccess && validSignature;

  React.useEffect(() => {
    if (!channelToken) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      (async () => {
        await connect();
      })();
    }
  }, [channelToken, connect]);

  return (
    <div className="fc-authkit-signin-button">
      {isAuthenticated ? (
        <ProfileButton
          userData={data}
          signOut={handleSignOut}
          hideSignOut={hideSignOut}
        />
      ) : (
        <>
          <Button className="gap-2" onClick={onClick}>
            <Image
              src="/farcaster.svg"
              alt="Farcaster"
              width={15}
              height={15}
            />
            Sign in
          </Button>
          {url && (
            <QRCodeDialog
              open={showDialog && !isMobile()}
              onClose={() => setShowDialog(false)}
              url={url}
              isError={isError}
              error={error}
            />
          )}
        </>
      )}
      {debug && (
        <div>
          <pre>{JSON.stringify(signInState, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};
