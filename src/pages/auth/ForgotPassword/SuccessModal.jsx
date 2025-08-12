import { MdCheck } from "react-icons/md";

const SuccessModal = ({ handleModalOkay }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-6">
      <div className="bg-white w-full max-w-[583px] rounded-xl p-6 shadow-lg">
        <div className="flex flex-col gap-3 items-center">
          <div className="flex items-center justify-center rounded-full bg-primary-70 size-16">
            <MdCheck className="text-white size-12" />
          </div>
          <p className="text-[#1E1E1E] font-semibold text-2xl text-center">
            Password Reset Successfully
          </p>
          <p className="text-center">
            Use this Password when next you want to Log In
          </p>
          <button
            onClick={handleModalOkay}
            className="w-full bg-primary-70 text-white rounded-lg py-3 mt-5 hover:bg-primary-80 transition-colors"
          >
            Okay
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
