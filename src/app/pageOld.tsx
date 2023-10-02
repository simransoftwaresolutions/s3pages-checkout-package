"use client";

// export default function Home() {
//   return (
//     <>
//     </>
//   )
// }


// import Myeditorcomp from '../components/preview/Myeditorcomp';
import '../styles/preview/globals.css';
import "../styles/preview/bootstrap-grid.css";
import 'bootstrap/dist/css/bootstrap.css';
import 'animate.css';
import { Fragment, useEffect } from "react";
import { SettingsProvider } from "../context/preview/SettingsContext";
import { PushProvider } from "../context/preview/PushContext";
import { PagesProvider } from '../context/preview/PagesContext';
import { ContentsProvider } from '../context/preview/ContentsContext';
import { CollectionProvider } from '../context/preview/CollectionModal';
import { CollectionDataProvider } from '../context/preview/CollectionDataModal';
import { SettingProvider } from '../context/preview/SettingModal';
// import 'react-quill/dist/quill.snow.css';
import HeadTag from '../components/preview/components/Atoms/HeadTag';
import '../styles/preview/custom.css';

// interface MyeditorProps {
//   id?:any;
//   token?:any;
// }
// const Home = ({id, token}:MyeditorProps) => {
const Home = () => {

  const id = "64661c4927827070ff3212e5";
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MmZmZGZiOGJkM2QwMWU3OWE5MGE5OCIsImlhdCI6MTY4NzkyODcxMywiZXhwIjoxNzE5NDY0NzEzfQ.ITTlkhQCZyu-hHDPOa0PKC83p6cWMl6ab_p-0p-FOcM";

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap" as any);
  }, []);

  return (
    <Fragment>
      <PagesProvider>
        <ContentsProvider>
          <PushProvider>
            <SettingsProvider>
              <CollectionProvider>
                <CollectionDataProvider>
                  <SettingProvider>
                    <HeadTag />
                    {/* <Myeditorcomp id={id} token={token} /> */}
                  </SettingProvider>
                </CollectionDataProvider>
              </CollectionProvider>
            </SettingsProvider>
          </PushProvider>
        </ContentsProvider>
      </PagesProvider>
    </Fragment>
  )
}

export default Home;
