
const HeaderPage = () => {
    return (
  <div  className="min-h-[500px] bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: "url('/header.jpg')" }}>
        
        <div className="absolute mt-30 ml-10">
            <h1 className="text-white font-bold text-4xl ">HEALTH <br /> CARE PRODUCTS</h1>
            <button className="btn bg-red-500 text-white text-2xl w-30 rounded-2xl mt-5">Buy Now!</button>
        </div>
      </div>
    

    );
};

export default HeaderPage;