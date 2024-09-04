import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from '../redux/store';

export default function useLoading() {

  const [loading, setLoading] = useState(true);
  const data = useSelector((state: RootState) => state.data);
  useEffect(() => {
    if (data.status === 'succeeded') {
      setLoading(false)
    }
  }, [data])
  return loading;

}
