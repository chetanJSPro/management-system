import React, { useEffect, useState } from "react";

import { ref, onValue } from "firebase/database";
import Layout from "../components/layout";
import fireConfig from "../firebaseconf";
import { database } from '../firebaseconf';

const ProfilePage = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const dataRef = ref(database, 'students');
        const unsubscribe = onValue(dataRef, (snapshot) => {
            const fetchedData = snapshot.val();
            setData(fetchedData);
        });

        // Cleanup the subscription on unmount
        return () => unsubscribe();
    }, []);

    return (
        <Layout>
            <div className={`profile-page ps-5 col-8 mt-5 pt-5`}>
                <main className="cd__main">
                    <div>
                        <pre>{JSON.stringify(data, null, 2)}</pre>

                    </div>
                </main>

            </div>
        </Layout>
    );
};

export default ProfilePage;