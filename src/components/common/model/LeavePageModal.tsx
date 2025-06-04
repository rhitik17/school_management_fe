
import { Icons } from "../../../assets/icons";
import Popup from "./Popup";
import { useNavigate } from "react-router-dom";



type PropsType = {
  open: boolean;
  handleClose: () => void;
};

const LeavePageModal = ({ open, handleClose }: PropsType) => {
  const navigate = useNavigate();
  return (
    <div>
      <Popup
        handleClose={handleClose}
      
        height="auto"
        open={open}
        width="640px"
        borderRadius="12px"
      >
        <div className="w-full h-[188px] bg-white  shadow-lg  flex flex-col justify-between items-center p-6">
          <div className="w-full">
           <div className="flex justify-between w-full">
           <h3 className="mb-2 text-lg font-semibold text-zinc-900">
              Leave page with unsaved changes?
            </h3>
            <span onClick={handleClose}><Icons.Close className="text-gray-600 cursor-pointer" /></span>
           </div>
            <p className="text-base text-zinc-900">
              Leaving this page will delete all unsaved changes.
            </p>
          </div>
          <div className="flex justify-end w-full gap-3">
            <button
              className="px-4 py-2.5 bg-white rounded-lg shadow border border-zinc-300 text-gray-700 text-base font-semibold"
              onClick={handleClose}
            >
              Stay
            </button>
            <button
              className="px-4 py-2.5 bg-red-600 rounded-lg text-white text-base font-semibold"
              onClick={() => navigate(-1)}
            >
              Leave Page
            </button>
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default LeavePageModal;
