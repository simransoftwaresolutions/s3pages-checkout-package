import FolderManager from "./FolderManager"
import { usePushCtx } from "../../../../../context/pagepreview/PushContext";
import { deepCloneStyle, deepCloneSection, filebrowserCallback } from '../../../../../utils/functions';

const FileManager = ({setImageURL}:any) => {

  const { fileBrowserRef, setFileBrowserRef } = usePushCtx();

  // const setImagePath = (type:any) => {
  //     setImageURL(type)
  // }

  return (
      <div className="d-flex justify-content-center align-items-center">

      {/* file manager modal */}
      <div
        className="modal fade "
        id="fileManagerModal"
        tabIndex={-1}
        aria-labelledby="fileManagerModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                File Manager
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body pt-0">
                <FolderManager titleNeed={false} main={false} setImagePath={(url:string) => filebrowserCallback(url, fileBrowserRef)}  styleComp={{height: "500px"}}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FileManager;