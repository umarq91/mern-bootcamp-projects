import {
  RedirectToSignIn,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";
type Props = {};

function Navbar({}: Props) {
  return (
    <header className="bg-indigo-600  py-5 shadow-md flex justify-around items-center">
      <div className="">
        <h1 className="text-3xl text-white font-semibold text-center">
          Expense Tracker
        </h1>
      </div>
      <div className="text-white font-medium  flex items-center">
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
        <SignedIn>
          <UserButton userProfileMode="modal" />
        </SignedIn>
      </div>
    </header>
  );
}

export default Navbar;
