import Popup from "./Popup";
import CloseIcon from "@mui/icons-material/Close";

type PropsType = {
  open: boolean;
  handleClose: () => void;
  handleSave: () => void;
  loading?: boolean;
};

const SaveChangesModal = ({
  open,
  handleClose,
  handleSave,
  loading,
}: PropsType) => {
  
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
                Are you sure you want to save changes?
              </h3>
              <span onClick={handleClose}>
                <CloseIcon className="text-gray-600 cursor-pointer" />
              </span>
            </div>
            <p className="text-base text-zinc-900">
              This will save your changes and update the data.
            </p>
          </div>
          <div className="flex justify-end w-full gap-3">
            <button
              className="px-4 py-2.5 bg-white rounded-lg shadow border border-zinc-300 text-gray-700 text-base font-semibold"
              onClick={handleClose}
            >
              Cancel
            </button>

            <button
              className="px-4 py-2.5 bg-red-600 rounded-lg text-white text-base font-semibold"
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? "Saving.." : "Save changes"}
            </button>
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default SaveChangesModal;
