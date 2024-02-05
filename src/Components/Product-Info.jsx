const ProductInfo = ({ prix, productDetails }) => {
  let marque = "";
  let taille = "";

  for (let i = 0; i < productDetails.length; i++) {
    if (productDetails[i]["TAILLE"]) {
      taille = productDetails[i]["TAILLE"];
    }
    if (productDetails[i]["MARQUE"]) {
      marque = productDetails[i]["MARQUE"];
    }
  }

  return (
    <div className="list-prix">
      <p>{prix} €</p>
      <p>{taille}</p>
      <p>{marque}</p>
    </div>
  );
};

export default ProductInfo;
