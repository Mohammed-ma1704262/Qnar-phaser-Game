"use client";

import React, { useState } from "react";
import { Loader, CheckCircle, Download, UploadCloud } from "lucide-react";
import CustomButton from "./CustomButton";
import Upload from "./upload-drop-zone"; // Importing the Dropzone component

export default function LoadingComponent({
  status = "waiting", // "waiting", "uploading", "uploaded", "ready-to-download"
  title = "Loading...",
  subtitle = "",
  spinnerColor = "text-blue-500",
  progressBars = [
    { percentage: 0, color: "bg-gray-300", showText: false },
    { percentage: 0, color: "bg-gray-300", showText: false },
    { percentage: 0, color: "bg-gray-300", showText: false },
    { percentage: 0, color: "bg-gray-300", showText: false }
  ],
  onFileSelect, // Function for handling file selection
  onDownload // Function to trigger file download
}) {
  const [fileUploaded, setFileUploaded] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen min-w-full">
      {/* Title & Subtitle */}
      <div className="text-3xl font-bold text-gray-800 mb-2 text-center">
        {title}
      </div>
      {subtitle && <div className="text-gray-500 text-center mb-6">{subtitle}</div>}

      {/* Loading Card */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-[75%] flex flex-col items-center">
        {/* Conditional UI based on Status */}
        {status === "waiting" && (
          <>
            <Loader className={`animate-spin ${spinnerColor} size-[5rem]`} />
            <div className="mt-2 font-semibold text-xl text-gray-700">
              Waiting...
            </div>
          </>
        )}

        {status === "uploading" && !fileUploaded ? (
          <Upload
            onSuccess={(file) => {
              setFileUploaded(true);
              if (onFileSelect) onFileSelect(file);
            }}
          />
        ) : status === "uploading" && fileUploaded ? (
          <>
            <UploadCloud className="text-blue-500 size-[5rem]" />
            <div className="mt-2 font-semibold text-xl text-gray-700">
              Uploading...
            </div>
          </>
        ) : null}

        {status === "sent" && (
          <>
            <CheckCircle className="text-gray-500 size-[5rem]" />
            <div className="mt-2 font-semibold text-xl text-gray-700">
              You Will Recive an Email Soon...
            </div>
          </>
        )}

        {status === "uploaded" && (
          <>
            <CheckCircle className="text-green-500 size-[5rem]" />
            <div className="mt-2 font-semibold text-xl text-gray-700">
              File is uploaded successfully !
            </div>
          </>
        )}

        {status === "ready-to-download" && (
          <CustomButton
            label="Download"
            icon={Download} // Pass Download icon
            color="bg-green-500"
            className="w-52 rounded-lg"
            onClick={onDownload}
          />
        )}

        {/* Progress Bar */}
        <div className="mt-4 flex w-full">
          {progressBars.length !== 0 ? (
            progressBars.map((bar, index) => (
              <div key={index} className="flex-1 mx-1 relative">
                <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-4 ${bar.color} ${
                      bar.percentage !== 100 ? "animate-pulse" : ""
                    } transition-all`}
                    style={{ width: `${bar.percentage}%` }}
                  />
                </div>
                {bar.showText && (
                  <div className="relative left-1/2 transform -translate-x-1/2 mt-1 text-sm text-gray-700">
                    {bar.percentage}%
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="flex-1 mx-1 relative "></div>
          )}
        </div>
      </div>
    </div>
  );
}
