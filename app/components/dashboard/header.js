import Button from "../ui/button/template";

function Header() {
  return (
    <div>
      <div className="flex justify-between items-center text-white font-lexend">
        <div>
          <h1 className=" text-5xl font-medium leading-tight">
            Good Afternoon User
          </h1>
        </div>

        <div className="w-[332px] h-[92px] justify-between px-4 py-3  text-white bg-gray-200 bg-opacity-5 rounded-[20px]  items-center gap-2.5 inline-flex">
          <div>
            <svg
              width="60"
              height="60"
              viewBox="0 0 60 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="30"
                cy="30"
                r="29.5"
                fill="#272424"
                stroke="#5B5C5C"
              />
              <path
                d="M28.75 41.75C34.2728 41.75 38.75 37.2728 38.75 31.75C38.75 26.2272 34.2728 21.75 28.75 21.75C23.2272 21.75 18.75 26.2272 18.75 31.75C18.75 37.2728 23.2272 41.75 28.75 41.75Z"
                stroke="white"
                stroke-width="4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M41.25 44.25L35.8125 38.8125"
                stroke="white"
                stroke-width="4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>

          <div>
            <svg
              width="60"
              height="60"
              viewBox="0 0 60 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.5"
                y="0.5"
                width="59"
                height="59"
                rx="19.5"
                fill="#121212"
                stroke="#5B5C5C"
              />
              <g clip-path="url(#clip0_77_1243)">
                <path
                  d="M38.2318 38.5059L31.8293 38.5059"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M28.1707 38.5059L21.7683 38.5059"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M38.2317 29.5508L30 29.5508"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M26.3415 29.5508L21.7683 29.5508"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M38.2316 20.5957L33.6584 20.5957"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M30 20.5957L21.7683 20.5957"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M31.8293 41.8652L31.8293 35.1488"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M26.3416 32.9102L26.3416 26.1937"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M33.6584 23.9551L33.6584 17.2387"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_77_1243">
                  <rect
                    width="26.8657"
                    height="21.9512"
                    fill="white"
                    transform="translate(19.0244 42.9844) rotate(-90)"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>

          <Button className="w-[114px] h-[60px] text-xl text-white bg-neutral-800 rounded-[20px]  shadow-inner border border-zinc-600  items-center ">
            Create
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Header;
