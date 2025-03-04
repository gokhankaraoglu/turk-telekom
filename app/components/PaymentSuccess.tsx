"use client";
import Image from "next/image";
import Cookies from "js-cookie";
import CustomButton from "../components/elements/CustomButton";
import { useEffect, useState } from "react";
import PdfViewer from "./PdfViewer";
import { notifyAppLoadSuccess } from "../utils";
import Header from "./Header";

interface PaymentSuccessPayload {
  policeNo: string;
  entegrasyonPoliceHareketKey: string;
}

function PaymentSuccess({
  policeNo,
  entegrasyonPoliceHareketKey,
}: PaymentSuccessPayload) {
  const policeId = Cookies.get("policeId");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!policeId) return;
    sendPoliceIWallet({ policeId });
  }, []);

  if (!policeId) return;

  const handleClick = () => {
    setIsOpen(true);
  };

  const sendPoliceIWallet = ({ policeId }: { policeId: string }) => {
    const status = "PaymentConfirmed";
    notifyAppLoadSuccess({
      status,
      policeGuid: policeId,
    });
  };

  return (
    <>
      <div className="flex flex-col justify-between items-center custom-min-height">
        <Header />
        <div className="flex flex-col justify-center items-center mt-20 text-center">
          <h2 className="text-2xl font-semibold mb-10">
            İşleminiz gerçekleşti
          </h2>
          <Image
            width={136}
            height={136}
            alt="Success"
            src="/success.png"
            className="mb-10"
          />
          <p className="text-xl font-semibold mb-10">
            Tebrikler AXA Sigorta’dan #{policeNo} nolu cep telefonu poliçeniz
            oluştu.
          </p>
        </div>
        <div className="mb-6 flex flex-col">
          <CustomButton className="mb-6" onClick={handleClick}>
            Poliçenizi görüntülemek ve kaydetmek için tıklayın
          </CustomButton>
        </div>
      </div>
      <PdfViewer
        policeId={policeId}
        entegrasyonPoliceHareketKey={entegrasyonPoliceHareketKey}
        isOpen={isOpen}
        close={() => setIsOpen(false)}
      />
    </>
  );
}

export default PaymentSuccess;
