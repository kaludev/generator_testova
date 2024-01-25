"use client"

import { getProviders, signOut, useSession } from "next-auth/react"
import { useEffect, useState } from "react";
import ProfileSection from "@components/Profile/Profile";
import SettingsForm from "@components/SettingsForm/SettingsForm";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
    const {data: session} = useSession();
    const [settings, setSettings] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [deactivating, setDeactivating] = useState(false);
    const router = useRouter();
    const [events, setEvents] = useState(false)
    const [requests, setRequests] = useState(false);
    const [data, setData] = useState([])
    const [request, setRequest] = useState({
        ime: {
            value: "",
            focus: false,
            error: false,
            errorMsg: ""
        },
        email: {
            value: "",
            focus: false,
            error: false,
            errorMsg: ""
        },
        nazivKluba: {
            value: "",
            focus: false,
            error: false,
            errorMsg: ""
        },
        emailKluba: {
            value: "",
            focus: false,
            error: false,
            errorMsg: ""
        },
        telefon: {
            value: "",
            focus: false,
            error: false,
            errorMsg: ""
        },
        poruka: {
            value: "",
            focus: false,
            error: false,
            errorMsg: ""
        }
    })
    const [profile,setProfile] = useState({
        ime: {
            value: "",
            focus: false,
            error: false,
            errorMsg: ""
        },
        email: {
            value: "",
            focus: false,
            error: false,
            errorMsg: ""
        },
        username: {
            value: "",
            focus: false,
            error: false,
            errorMsg: ""
        }
    })
    const [submitting, setSubmitting] = useState(false)
    const handleDeactivate = async () => {
        setDeactivating(true);
        try{
            const res = await fetch('/api/user/deactivate')
            if(!res.ok){
                setDeactivating(false);
                throw new Error(await res.text());
            }
            setDeactivating(false);
            toast.success("Uspesno poslan zahtev",{
                position: toast.POSITION.TOP_RIGHT
            });
            await signOut();
            
        }catch(e){
            toast.error("Greska: " + e.message);
        }finally{
            window.location.href = '/';
        }
    }
    
    useEffect(() =>{
        setProfile({
            ime: {
                value: session?.user.name,
                focus: true,
                error: false,
                errorMsg: ""
            },
            email: {
                value: session?.user.email,
                focus: true,
                error: false,
                errorMsg: ""
            },
            username: {
                value: session?.user.username,
                focus: true,
                error: false,
                errorMsg: ""
            }
        })
    }, [session] )
    useEffect(() =>{
        if(session?.user.isOrganizer){
            const fetchPosts = async () => {
                try{
                    const res = await fetch('/api/event/getmyevents');
                    console.log(res);
                    const posts = await res.json()
                    if(!res.ok) return new Error(res.text);
                    setData(posts);
                    console.log(posts);
                }catch(e){
                    toast.error(e.message);
                    console.log(e);
                }
              };
              fetchPosts();
        }
    },[session])
    const handleEdit = async (id) =>{
        await router.push('/edit-event?id=' + id);
    }
    const handleDelete = async (id) =>{
        try{
            const res = await fetch('/api/event/delete/'+id);
            if(!res.ok) return new Error(res.text);
            toast.success("Uspesno obrisano");
            const copy = [];
            data.forEach(event => {
                if(event._id != id){
                    copy.push(event);
                }
            })
            setData(copy);
        }catch(e){
            toast.error(e.message);
            console.log(e);
        }
    }
    return (
            <div>
                <ProfileSection 
                name={session?.user.name}
                username={session?.user.username}
                photo ={session?.user.image}
                isSuperAdmin={session?.user.isSuperAdmin}
                requestedOrganizer={session?.user.requestedOrganizer}
                isOrganizer={session?.user.isOrganizer}
                form = {showForm}
                showForm={() => {setShowForm((prev) => !prev);setSettings(false)}}
                settings={settings}
                showSettings={() => {setSettings((prev) => !prev); setShowForm(false)}}
                events={events}
                showEvents={() => {setEvents((prev) => !prev);}}
                requests={requests}
                showRequests={() => {setRequests((prev) => !prev);}}
                handleSignOut={async () =>{await signOut(); window.location.href ='/'}}
                handleDeactivate={handleDeactivate}
                deactivating={deactivating}
                />
                {showForm && 
                    <OrganizationForm
                    request={request}
                    setRequest={setRequest}
                    submitting={submitting}
                    setSubmitting={setSubmitting}
                    backToProfile={() =>{ setSettings(false); setShowForm(false)}}
                    />
                }
                {settings && 
                    <SettingsForm
                        profile={profile}
                        setProfile={setProfile}
                        backToProfile={() =>{ setSettings(false); setShowForm(false);window.location.reload();}}
                    />
                    }
                {requests && 
                <Requests/>
                }
                {events && 
                <EventsAdmin
                data={data}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                />
                }
            </div>
            
    )
}

export default Profile