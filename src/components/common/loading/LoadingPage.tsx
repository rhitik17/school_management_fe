import logo from "../../../../public/images/newLogo.png"

const LoadingPage = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-primary_bg">
      <div className="relative w-64 h-64">
        {/* Rotating circle */}
        <div className="absolute inset-0 border-4 border-primary-700 border-t-transparent rounded-full animate-spin"></div>

        {/* Logo in the middle */}
        <img
          src={logo}
          alt="Logo"
          className="w-52 h-52 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-contain"
        />
      </div>
    </div>
  );
};

export default LoadingPage;
