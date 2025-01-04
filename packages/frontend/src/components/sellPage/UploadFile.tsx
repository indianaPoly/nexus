import { useState } from "react";

interface UploadFileProps {
  onFileSelected: (file: File | null) => void;
}

const UploadFile = ({ onFileSelected }: UploadFileProps) => {
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFileName(file.name);
      onFileSelected(file); // 선택한 파일 정보를 상위로 전달
    }
  };

  const resetFile = () => {
    setSelectedFileName(null);
    onFileSelected(null); // 파일 초기화
  };

  return (
    <div className="border-b border-gray-700 pb-4">
      <label className="block text-lg font-semibold mb-2">파일 선택</label>
      {/* 파일 업로드 버튼 */}
      <label
        className="inline-block py-2 px-4 bg-pink-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition duration-300"
        htmlFor="input-file"
      >
        파일 업로드
      </label>
      <input
        type="file"
        id="input-file"
        onChange={handleFileChange}
        style={{
          display: "none",
        }}
        accept="*/*"
      />
      {selectedFileName && (
        <div className="mt-4">
          <p className="text-sm text-gray-400">
            선택된 파일: {selectedFileName}
          </p>
          <button
            onClick={resetFile}
            className="mt-2 py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
          >
            파일 초기화
          </button>
        </div>
      )}
    </div>
  );
};

export default UploadFile;
