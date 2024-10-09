import ApartmentIcon from '@mui/icons-material/Apartment';
import EmailIcon from '@mui/icons-material/Email';

export default function Footer() {
  return (
    <footer className="text-center lg:text-left bg-slate-50 text-gray-600">
      <div className="mx-6 py-10 text-center md:text-left">
        <div className="grid grid-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="">
            <h6 className="
                uppercase
                font-semibold
                mb-4
                flex
                items-center
                justify-center
                md:justify-start
                gap-2
              ">
              <ApartmentIcon />
              <div className="italic">
                APT-REAL
              </div>
            </h6>
            <p className="lg:text-left">
              아파트 실거래가 비교
            </p>
          </div>
          <div className="">
            <h6 className="uppercase font-semibold mb-4 flex justify-center md:justify-start">
              Useful links
            </h6>
            <p className="mb-4">
              <a href="https://rt.molit.go.kr/" target="_blank" className="text-gray-600">국토교통부 실거래가</a>
            </p>
          </div>
          <div className="">
            <h6 className="uppercase font-semibold mb-4 flex justify-center md:justify-start">
              Contact
            </h6>
            <p className="flex items-center justify-center md:justify-start mb-4 gap-2">
              <EmailIcon />
              dhkim9549@naver.com
            </p>
          </div>
        </div>
      </div>
      <div className="h-20 lg:h-0"></div>
    </footer>
  )
} 
