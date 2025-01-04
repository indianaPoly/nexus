interface ProductCardProp {
  key: number;
  name: string;
  category: string;
  price: number;
  fileType: string;
}

const ProductCard = ({
  key,
  name,
  category,
  price,
  fileType,
}: ProductCardProp) => {
  return (
    <div key={key} className="relative h-[400px] group perspective-2000">
      {/* VCM 베이스 */}
      <div className="absolute bottom-0 w-full h-1/4 bg-gradient-to-t from-gray-800 to-gray-900 rounded-b-lg">
        {/* 메탈릭 베이스 */}
        <div className="absolute bottom-0 w-full h-full bg-gradient-to-t from-gray-700 via-gray-600 to-gray-700 rounded-b-lg">
          {/* 원형 베이스 플랫폼 */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32">
            <div className="absolute inset-0 rounded-full bg-gray-800 border-2 border-cyan-500/30" />
            <div className="absolute inset-2 rounded-full bg-gradient-to-t from-gray-900 to-gray-800 border border-cyan-400/20" />
            <div className="absolute inset-4 rounded-full bg-cyan-900/20" />
          </div>
        </div>
      </div>

      {/* 홀로그램 디스플레이 영역 */}
      <div className="absolute inset-0 group-hover:animate-hologram-rise">
        {/* 홀로그램 콘텐츠 */}
        <div className="relative h-full flex items-center justify-center">
          {/* 수직 빔 효과 */}
          <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-2 h-3/4 group-hover:opacity-100 opacity-0 transition-opacity duration-700">
            <div className="absolute inset-0 bg-gradient-to-t from-cyan-500 to-transparent blur-md" />
          </div>

          {/* 홀로그램 텍스트 */}
          <div className="relative transform transition-transform duration-700 ease-out">
            {/* 메인 텍스트 */}
            <div className="relative">
              <h2 className="text-4xl font-bold text-cyan-300 text-center tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse-slow">
                {name}
              </h2>

              <div className="text-2xl text-cyan-400 text-center mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                {fileType}
              </div>

              {/* 가격 정보 */}
              <div className="text-2xl text-cyan-400 text-center mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                {price} ETH
              </div>

              {/* 텍스트 반사 효과 */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
