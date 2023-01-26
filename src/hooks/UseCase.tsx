import axios from "axios";
import { useState, useCallback, useEffect } from "react";
import { Case } from "../models";

export default function useCase() {

    const [currentCase, setCurrentCase] = useState<Partial<Case>>();
    const [caseIndex, setCaseIndex] = useState<number>(0);
    const [caseList, setCaseList] = useState<Partial<Case>[]>([]);
    const [loading, setLoading] = useState<boolean>();

    const getCases = useCallback(async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${process.env.REACT_APP_SERVER_URL ?? ""}/case`)
            if (res.status === 200) {
                setCaseList(res.data);
                setCurrentCase(res.data[0]);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }

    }, [])

    const saveCase = useCallback(async () => {
        try {
            setLoading(true);
            const res = await axios.put(`${process.env.REACT_APP_SERVER_URL ?? ""}/case`,
                currentCase,
                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json;charset=UTF-8",
                    },
                });

            return res.status;
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }

    }, [currentCase])

    const addToCase = useCallback((caseInfo: Partial<Case>) => {
        setCurrentCase(cc => {
            return { ...cc, ...caseInfo };
        });
    }, []);

    const nextCase = useCallback(async () => {
        setLoading(true);
        //first, save the current case
        if (currentCase?.label)
            await saveCase();

        const nextI = caseIndex + 1 >= caseList.length ? 0 : caseIndex + 1;
        setCaseIndex(nextI);
        setCurrentCase(caseList[nextI]);

    }, [caseIndex, caseList, currentCase?.label, saveCase]);

    useEffect(() => {
        getCases();
    }, [])

    //when current case is updated, remove loading
    useEffect(() => {
        setLoading(false);
    }, [currentCase])

    return { currentCase, addToCase, nextCase, useCaseLoading: loading }

}