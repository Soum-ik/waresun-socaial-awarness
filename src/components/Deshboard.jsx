import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { useState } from 'react';

import { FaChevronDown, FaLastfmSquare } from "react-icons/fa";
import Cookies from "js-cookie";

// all form's
import CampaineForm from './PostForm';
import BusinessPostPromotionForm from './BussinessForm';
import UserProfileForm from './UserProfileForm';

// campaignedit & delete table's
import CampaignListTable from './CampaignListTable';
import BusinessListTable from './BusinessListTable';
import PasswordUpdateForm from './UserPasswordUpdate';


export default function Deshboard() {
  const userObject = Cookies.get('userObject');
  const parseData = userObject ? JSON.parse(userObject) : {};



  // for remove token
  const remoevToken = () => {
    Cookies.remove('authToken');
    Cookies.remove('userInfo');
    Cookies.remove('userObject');
    window.location.reload();
  };

  // manage campaignPost 
  const [campaignPost, setCampaignPost] = useState(false);
  const [campaignedit, setCampaignEdit] = useState(false);


  // for user profile
  const [userProfile, setUserProfile] = useState(false);


  const [businessPost, setBusinessPost] = useState(false);
  const [businessEdit, setBusinessEdit] = useState(false);

  const [updatePassword, setUpdatePassword] = useState(false);


  // campaignedit campaignPost
  const handleCampaingForm = () => {
    setCampaignPost(!campaignPost);
    localStorage.setItem('isOpen', !campaignPost);
  };
  const handleCampaingTablesDatas = () => {
    setCampaignEdit(!campaignPost);
  };


  const userUpdate = () => {
    setUserProfile(!userProfile);
  };


  const handleBusinessPostForm = () => {
    setBusinessPost(!businessPost);
  };
  const handleBusinessTablesDatas = () => {
    setBusinessEdit(!campaignPost);
  };

  const updateUserPassword = () => {
    setUpdatePassword(!updatePassword);
  };


  return (
    <div>
      <Menu as="div" className="relative inline-block text-left cursor-pointer">
        <div>
          <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-sm bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            Dashboard
            <FaChevronDown aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
          </MenuButton>
        </div>

        <MenuItems
          transition
          className="absolute right-0 text-right z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
        >
          <div className="py-1">
            <MenuItem>
              <a
                onClick={userUpdate}
                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
              >
                {parseData.name}
              </a>
            </MenuItem>
            <MenuItem>
              <a
                onClick={handleBusinessPostForm}
                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
              >
                Business
              </a>
            </MenuItem>
            <MenuItem>
              <a
                onClick={handleBusinessTablesDatas}
                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
              >
                Business List
              </a>
            </MenuItem>
            <MenuItem>
              <a
                onClick={handleCampaingForm}
                className="block px-4 py-2 cursor-pointer text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
              >
                Campaing
              </a>
            </MenuItem>
            <MenuItem>
              <a
                onClick={handleCampaingTablesDatas}
                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
              >
                Campaing List
              </a>
            </MenuItem>
            <MenuItem>
              <a
                onClick={updateUserPassword}
                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
              >
                Setting
              </a>
            </MenuItem>
            <MenuItem>
              <button
                onClick={remoevToken}
                type="submit"
                className="block w-full px-4 py-2 text-right text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
              >
                Sign out
              </button>
            </MenuItem>

          </div>
        </MenuItems>
      </Menu>

      {campaignPost && <CampaineForm close={() => setCampaignPost(!campaignPost)} />}
      {campaignedit && <CampaignListTable close={() => setCampaignEdit(!campaignedit)} />}

      {userProfile && <UserProfileForm close={() => setUserProfile(!userProfile)} />}

      {businessPost && <BusinessPostPromotionForm close={() => setBusinessPost(!businessPost)} />}
      {businessEdit && <BusinessListTable close={() => setBusinessEdit(!businessEdit)} />}

      {updatePassword && <PasswordUpdateForm close={() => setUpdatePassword(!updatePassword)} />}

    </div>

  );
}