import { useLocation } from "react-router-dom"

const BuyPage = () => {
    const location = useLocation();
    const product = location.state || {};
    console.log(product);
  return (
    <div>
      
    </div>
  )
}

export default BuyPage
