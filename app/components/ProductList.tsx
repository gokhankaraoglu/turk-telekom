"use client";
import { FaMobile, FaCar, FaPlane, FaMedkit, FaCarCrash } from "react-icons/fa";
import { formatName, setSessionStorage } from "../utils";
import { useRouter } from "next/navigation";
import Loading from "../loading";
import { useEffect, useState } from "react";
import { DataItem } from "../types";
import { post } from "../utils/api";
import { Paths } from "../types/constants";
import CustomButton from "./elements/CustomButton";
import { getToken } from "../hooks/useToken";
import { ProductApiResponse } from "../types/product";
import Footer from "./Footer";

const productIcons: Record<number, JSX.Element> = {
  49: <FaMobile />,
  11: <FaCar />,
  14: <FaPlane />,
  13: <FaMedkit />,
  10: <FaCarCrash />,
};

const defaultIcon = <FaMedkit />;

function ProductList() {
  const [products, setProducts] = useState<DataItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        await getToken();
        const products = await getProducts();
        setProducts(products);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  async function getProducts(): Promise<DataItem[]> {
    try {
      const response = await post<any, ProductApiResponse>({
        path: Paths.GetUrun,
        payload: {},
      });
      return response.Data.Items;
    } catch (error) {
      console.error("Failed to fetch products:", error);
      throw error;
    }
  }

  const handleProductSelect = (product: DataItem) => {
    setSessionStorage("product", product);

    if (product.URUN_ID !== 49) return;

    router.push("/teklif-form");
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="pt-16 flex flex-col justify-between custom-min-height">
      <div className="flex flex-col items-center">
        {products.map((product) => (
          <CustomButton
            saturated
            className="mb-2.5 flex justify-start items-center border-[#b1b1b1]"
            key={product.URUN_ID}
            onClick={() => handleProductSelect(product)}
          >
            {productIcons[product.URUN_ID] || defaultIcon}
            <p className="ml-2 text-sm  md:text-base text-black">
              {formatName(product.URUN_AD)}
            </p>
          </CustomButton>
        ))}
      </div>
      <div className="flex flex-col justify-center items-center mb-3">
        <Footer />
      </div>
    </div>
  );
}

export default ProductList;
