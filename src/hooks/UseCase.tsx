import axios from "axios";
import { useState, useCallback, useEffect } from "react";
import { Case } from "../models";

type useCaseProps = {
    selectedCondition: string | undefined,
    mayFetch: boolean | undefined
}

export default function useCase({ selectedCondition, mayFetch }: useCaseProps) {

    const [currentCase, setCurrentCase] = useState<Partial<Case>>();
    const [caseIndex, setCaseIndex] = useState<number>(0);
    const [caseList, setCaseList] = useState<Partial<Case>[]>([]);
    const [loading, setLoading] = useState<boolean>();

    const getCases = useCallback(async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${process.env.REACT_APP_SERVER_URL ?? ""}/case`);
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
                { ...currentCase, label: selectedCondition, labelled: true });

            return res.status;
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }

    }, [currentCase, selectedCondition])

    const nextCase = useCallback(async () => {
        let auxCaseList = [...caseList];
        setLoading(true);
        //first, save the current case
        if (selectedCondition) {
            const status = await saveCase();
            if (status === 200) {
                auxCaseList = auxCaseList.filter((c, i) => { return i !== caseIndex })
            }
        }

        const nextI = caseIndex + 1 >= auxCaseList.length ? 0 : caseIndex + 1;
        setCaseIndex(nextI);
        setCurrentCase(auxCaseList[nextI]);

        setCaseList(auxCaseList);

    }, [caseIndex, caseList, saveCase, selectedCondition]);

    useEffect(() => {
        mayFetch && getCases();
    }, [getCases, mayFetch])

    //when current case is updated, remove loading
    useEffect(() => {
        if (caseList.length !== 0) {
            setLoading(false);
        }
    }, [caseList.length, currentCase])

    return { caseList, currentCase, nextCase, useCaseLoading: loading }

}