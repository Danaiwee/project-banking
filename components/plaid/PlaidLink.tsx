/* eslint-disable camelcase */
"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {
  PlaidLinkOptions,
  PlaidLinkOnSuccess,
  usePlaidLink,
} from "react-plaid-link";

import { ROUTES } from "@/constants/routes";
import {
  createLinkToken,
  exchangePublicToken,
} from "@/lib/actions/user.action";

import { Button } from "../ui/button";

interface PlaidLinkProps {
  user: User | null;
  variant: string;
}

const PlaidLink = ({ user, variant }: PlaidLinkProps) => {
  const router = useRouter();

  // 1.Create Token State
  const [token, setToken] = useState("");

  // 2.Create Token and set to the token state
  useEffect(() => {
    const getLinkToken = async () => {
      const data = await createLinkToken(user);
      setToken(data?.linkToken);
    };
    getLinkToken();
  }, [user]);

  // 3.Create onSuccess function
  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (public_token: string) => {
      await exchangePublicToken({
        publicToken: public_token,
        user,
      });

      router.push(ROUTES.HOME);
    },
    [user]
  );

  // 4.Setting config for PlaidOptions using token and onSuccess
  const config: PlaidLinkOptions = {
    token,
    onSuccess,
  };

  // 5.Call usePlaidlink callback and pass the config
  const { open, ready } = usePlaidLink(config);

  return (
    <>
      {variant === "primary" ? (
        <Button
          className="plaidlink-primary"
          onClick={() => open()}
          disabled={!ready}
        >
          Connect Bank
        </Button>
      ) : variant === "ghost" ? (
        <Button className="plaidlink-ghost">Connect Bank</Button>
      ) : (
        <Button>Connect bank</Button>
      )}
    </>
  );
};

export default PlaidLink;
