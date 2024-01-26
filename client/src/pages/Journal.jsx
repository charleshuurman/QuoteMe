import Auth from "../utils/auth";
import { Link } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { QUERY_A_QUOTE } from '../utils/queries';


const Journal = () => {
  const { data } = useQuery(QUERY_A_QUOTE, {
    variables: {quoteId: "65b310cc2bf2ab3c5a8ddcd1"}
  });
  let user;

  if (data) {
    user = data.user;
  }

  console.log(data);

  return (
    <>
      <ul className="menu menu-lg bg-base-200 w-56 rounded-box">
        <li>
          <a>Quote 1</a>
        </li>
        <li>
          <a>Quote 2</a>
        </li>
        <li>
          <a>Quote 3</a>
        </li>
      </ul>
    </>
  );
};

export default Journal;
