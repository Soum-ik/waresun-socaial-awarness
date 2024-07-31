import { useEffect, useState } from "react";

export const useBusiness = (url) => {

    const [datas, setDatas] = useState([]);


    useEffect(() => {
        const fetching = async () => {
            const data = await fetch(url);
            const res = await data.json();
            setDatas(res.data);
        };
        fetching();
    }, []);

    return datas;
};


