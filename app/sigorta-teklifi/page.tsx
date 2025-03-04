"use client";

import Link from "next/link";
import { Icon, Icons } from "../components/elements/Icon";
import CustomButton from "../components/elements/CustomButton";
import Offer from "../components/Offer";
import { getSessionStorage } from "../utils";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { StoredPoliceItem } from "../types/product";
import Spinner from "../components/elements/Spinner";
import Footer from "../components/Footer";
import Header from "../components/Header";

function SelectedOffer() {
  const router = useRouter();
  const [police, setPolice] = useState<StoredPoliceItem | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const selectedPolice: StoredPoliceItem | undefined =
      getSessionStorage("selected-police");

    if (!selectedPolice) {
      router.push("/");
      return;
    }

    setPolice(selectedPolice);
  }, []);

  return (
    <>
      <div className="pt-16 flex flex-col justify-between custom-min-height">
        <Header />
        <div className="flex flex-col items-center">
          <Link
            href="/teklif-listesi"
            className="mb-11 inline-block self-start"
          >
            <span className="flex items-center">
              <Icon icon={Icons.ARROW_LEFT} />
              {/* <span className="ml-3 font-semibold text-xl">Teklife Dön</span> */}
            </span>
          </Link>
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold">Sigorta Teklifi</h2>
            <p className="text-[#667085] font-extralight text-lg">
              Teklifin detayları aşağıdaki gibidir. Onaylayarak ödeme adımına
              geçebilirsiniz.
            </p>
          </div>
          <div className="w-full flex flex-col justify-center items-center mb-2.5">
            {police ? (
              <Offer
                title={police?.title}
                company={police?.company}
                startDate={police?.startDate}
                endDate={police?.endDate}
                price={police?.price}
                brand={police?.brand}
                model={police?.model}
                deviceValue={police?.deviceValue}
                entegrationId={police?.entegrationId}
                setIsProcessing={setIsProcessing}
              />
            ) : (
              <Spinner />
            )}
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <CustomButton
            form="form2"
            type="submit"
            className="mb-3.5"
            disabled={!police?.entegrationId || isProcessing}
          >
            {isProcessing
              ? "Ödeme sayfasına yönlendiriliyorsunuz..."
              : "Devam Et"}
          </CustomButton>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default SelectedOffer;
