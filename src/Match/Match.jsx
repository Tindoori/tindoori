import { React, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import React, { useState } from "react";

export default function Match() {
  // eslint-disable-next-line no-unused-vars
  const [match, setMatch] = useState(true);

  return (
    <div className="container">
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch
      </button>
      <div className="modal hide">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Its a match!</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body"> recipe content</div>
          </div>
        </div>
      </div>
    </div>
  );
}
