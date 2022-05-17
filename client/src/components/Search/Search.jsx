import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getResults, clearResults } from "../../redux/actions";
import { Results } from "../index";
import { useEffect } from "react";

export default function Search() {
  const dispatch = useDispatch(),
    { game } = useParams();

  dispatch(getResults(game));

  useEffect(() => {
    return () => {
      dispatch(clearResults());
    };
    // eslint-disable-next-line
  }, []);

  return <Results />;
}
