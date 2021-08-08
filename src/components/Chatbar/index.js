import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const users = [
  {
    id: 1,
    name: 'Debarshi Bhattacharjee',
    pic: 'https://franchisematch.com/wp-content/uploads/2015/02/john-doe.jpg',
  },
  {
    id: 2,
    name: 'Dev',
    pic: 'https://franchisematch.com/wp-content/uploads/2015/02/john-doe.jpg',
  },
  {
    id: 3,
    name: 'Roshan',
    pic: 'https://franchisematch.com/wp-content/uploads/2015/02/john-doe.jpg',
  },
];

const Chatbar = () => {
  const { pathname } = useLocation();

  return (
    <div className="bg-white w-full">
      <div className="px-4 py-3">
        <input
          type="search"
          name="search"
          aria-label="Search.."
          placeholder="Search.."
          className="w-full outline-none font-medium"
        />
      </div>
      <div>
        {users.map((user) => (
          <Link key={user.id} className="sm:pointer-events-none" to={`${pathname}/${user.id}`}>
            <div className="py-2 px-4 flex h-16 justify-evenly hover:bg-blue-500 cursor-pointer">
              <img src={user.pic} alt="" className="rounded-full" />
              <div className="overflow-ellipsis whitespace-nowrap overflow-hidden mx-2 flex flex-col justify-evenly">
                <h4 className="font-medium">{user.name}</h4>
                <p className="text-sm">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi rerum,
                  voluptatem quibusdam fugit similique sequi adipisci, doloribus, nostrum distinctio
                  nobis quod magnam dignissimos debitis. Architecto commodi molestiae incidunt magni
                  necessitatibus!
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Chatbar;
