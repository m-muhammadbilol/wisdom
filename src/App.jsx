import React, { useEffect, useRef, useState } from "react";

export default function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [loader, setLoader] = useState(false);
  const [font, setFont] = useState("Noto Sans Mono");
  const audioRef = useRef(null);
  function dataGet(word) {
    setLoader(true);
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (Array.isArray(res)) {
          setData(res);
          console.log(res);
        } else {
          setData([]);
        }
      })
      .finally(() => {
        setLoader(false);
      });
  }

  if (loader) {
    return (
      <div className="fixed inset-0 flex justify-center items-center">
        Loading...
      </div>
    );
  }
  return (
    <div
      style={{ fontFamily: font }}
      className="max-w-[330px] md:max-w-[737px] mr-auto ml-auto ">
      <header className="flex pt-[55px] items-center justify-between">
        <div>
          <img src="./book.svg" alt="logo" />
        </div>
        <div className="flex gap-[50px] items-center">
          <div>
            <select
              onChange={(e) => setFont(e.target.value)}
              className="select select-ghost text-[18px] font-bold w-[150px]">
              <option
                className="hover:text-[#A445ED]"
                value={"Google Sans Flex"}>
                Sans Serif
              </option>
              <option className="hover:text-[#A445ED] " value={"Noto Serif"}>
                Serif
              </option>
              <option
                selected
                className="hover:text-[#A445ED]"
                value={"Noto Sans Mono"}>
                Mono
              </option>
              <option className="hover:text-[#A445ED]" value={"Roboto Mono"}>
                Roboto Mono
              </option>
              <option className="hover:text-[#A445ED]" value={"Fira Mono"}>
                Fira Mono
              </option>
            </select>
          </div>
          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                value="dark"
                className="toggle  checked:bg-[#A445ED]  theme-controller "
              />
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.750002 10.199C0.748458 12.5783 1.55169 14.8883 3.02914 16.7533C4.50659 18.6183 6.57139 19.9288 8.88799 20.4718C11.2045 21.0147 13.6366 20.7582 15.789 19.744C17.9412 18.7297 19.6873 17.0173 20.7431 14.8852C11.2942 14.8852 6.60799 10.1979 6.60799 0.75C4.84842 1.62311 3.36767 2.97033 2.33266 4.63981C1.29765 6.3093 0.749502 8.23469 0.750002 10.199Z"
                  stroke="#757575"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </label>
          </div>
        </div>
      </header>
      <section className="pt-[50px]">
        <form
          onSubmit={(el) => {
            el.preventDefault();
            dataGet(search);
          }}>
          <label className="input validator rounded-[16px] w-full focus:outline-0 outline-0">
            <input
              type="text"
              onInput={(evt) => setSearch(evt.target.value)}
              placeholder="Search for any word..."
              required
            />
            <button type="submit">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24">
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </g>
              </svg>
            </button>
          </label>
          <div className="validator-hint hidden">Whoops, can’t be empty…</div>
        </form>
      </section>

      <section>
        <div>
          {data.length === 0 && (
            <div className="flex flex-col items-center justify-center">
              <p className="text-[64px]">😕</p>
              <p className=" font-bold text-[20px]">No Definitions Found</p>
              <p className="font-light text-[14px]">
                Sorry pal, we couldn't find definitions for the word you were
                looking for. You can try the search again at later time or head
                to the web instead.
              </p>
            </div>
          )}

          {data.map((el, i) => (
            <div key={i} className="pt-[45px]">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-[32px]">{el?.word}</h3>
                  <h3 className="text-[#A445ED] text-[18px]">
                    {el.phonetic || "no phonetic  "}
                  </h3>
                </div>
                <div>
                  {/* {el.phonetics.map((e, i) => { */}
                  {/* return ( */}
                  <div>
                    <img
                      className="w-[100px] h-[100px]"
                      onClick={(e) => {
                        audioRef.current.play();
                        e.target.src = "./pouse.jpg";
                        setTimeout(() => {
                          e.target.src = "./musicbtn.svg";
                        }, 2000);
                      }}
                      src="./musicbtn.svg"
                      alt=""
                    />
                    <audio
                      ref={audioRef}
                      src={el.phonetics[0]?.audio || el.phonetics.audio}>
                      <source
                        src={el.phonetics[0]?.audio || el.phonetics.audio}
                      />
                    </audio>
                  </div>
                  {/* ); */}
                  {/* })} */}
                </div>
              </div>
              <div>
                <div className="font-bold text-[24px]">
                  {el.meanings.map((el, i) => {
                    return (
                      <div key={i}>
                        <div
                          key={i}
                          className="flex flex-col items-start pt-[30px]">
                          {el.partOfSpeech || (
                            <hr className="border-2 border-red-950 w-full" />
                          )}

                          <div className="flex flex-col text-[14px] font-light items-start gap-[30px]">
                            {el.definitions.map((el, i) => {
                              return (
                                <div key={i}>
                                  <ul>{el.definition}</ul>
                                  <ul>{el.example}</ul>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        <div className="text-[#757575] pt-[20px] text-[15px] font-normal">
                          Synonyms
                          {el.synonyms.map((e, i) => {
                            return (
                              <span
                                key={i}
                                className="text-[#A445ED] cursor-pointer flex flex-col gap-3"
                                onClick={() => {
                                  setSearch(e);
                                  dataGet(e);
                                }}>
                                {e}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div>
                <a href={el.sourceUrls}>{el.sourceUrls}</a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
