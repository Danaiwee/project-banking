/* eslint-disable camelcase */
"use client";

import Image from "next/image";
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
  variant?: string;
  isMobile?: boolean;
  isRightSidebar?: boolean;
}

const PlaidLink = ({
  user,
  variant,
  isMobile = false,
  isRightSidebar = false,
}: PlaidLinkProps) => {
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

  if(isRightSidebar) {
    return (
      <Button className="plaidlink-default" onClick={() => open()}>
          <Image
            src="/icons/plus.svg"
            width={20}
            height={20}
            alt="Plus icon"
          />
          <p
            className={`text-[16px] font-semibold text-black-2 ${isMobile ? "" : "hidden xl:flex"} }`}
          >
            Add Bank
          </p>
        </Button>
    )
  }

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
        <Button className="plaidlink-ghost" onClick={() => open()}>
          Connect Bank
        </Button>
      ) :  (
        <Button className="plaidlink-default" onClick={() => open()}>
          <Image
            src="/icons/connect-bank.svg"
            width={24}
            height={24}
            alt="Bank icon"
          />
          <p
            className={`text-[16px] font-semibold text-black-2 ${isMobile ? "" : "hidden xl:flex"} }`}
          >
            Connect bank
          </p>
        </Button>
      )}
    </>
  );
};

export default PlaidLink;
