import { useState, useEffect } from "react";
import "./styles.css";

type Data = {
  results: [
    {
      name: {
        first: string;
      };
      picture: {
        large: string;
      };
    }
  ];
};

type Results = {
  name: {
    first: string;
  };
  picture: {
    large: string;
  };
};

export default function App() {
  const [number, setNumber] = useState<number>(1);
  const [fetchedData, setData] = useState<Results[] | []>([]);

  const grabApi = async (nr: number) => {
    const response = await fetch("https://randomuser.me/api?page=" + nr);
    const data: Data = await response.json();
    // const turnDataIntoString = JSON.stringify(data)
    // setData(data.results)
    setData((prev) => [...prev, data.results[0]]);
    console.log("DATA", data);
  };

  useEffect(() => {
    grabApi(number);
  }, [number]);

  console.log("fDATA", fetchedData);
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <h3>Numer of users: {fetchedData.length}</h3>
      <button onClick={() => setNumber((prev) => prev + 1)}>Next User </button>
      {fetchedData?.map((user: any) => (
        <>
          <h3>{user.name?.first}</h3>
          <div>
            <img src={user.picture?.large} alt="" />
          </div>
        </>
      ))}
    </div>
  );
}
