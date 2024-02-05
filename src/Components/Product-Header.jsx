const ProductHeader = ({ owner }) => {
  console.log(owner);
  return (
    <div className="header-image">
      <div className="img">
        {owner.account.avatar ? (
          <img src={owner.account.avatar.secure_url} alt="" />
        ) : (
          <></>
        )}

        <p>{owner.account.username}</p>
      </div>
    </div>
  );
};

export default ProductHeader;
