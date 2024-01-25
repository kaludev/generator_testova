import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from 'react'
import styles from './SettingsForm.module.css'

const SettingsForm = ({profile, setProfile,backToProfile})  => {
    const [submitting, setSubmitting] = useState(false);
    async function handleSubmit(e) {
        e.preventDefault();
        setSubmitting(true);
        let valid = true;

        if (profile.ime.value == ``) {
            const copy = { ...profile };
            copy['ime'].error = true;
            copy['ime'].errorMsg = "Morate uneti ime";
            setProfile(copy);
            valid = false;
        }
        else{
            const copy = { ...profile };
            copy['ime'].error = false;
            copy['ime'].errorMsg = "";
            setProfile(copy);
        }

        if (profile.username.value == ``) {
            const copy = { ...profile };
            copy['username'].error = true;
            copy['username'].errorMsg = "Morate uneti username";
            setProfile(copy);
            valid = false;
        }
        else{
            const copy = { ...profile };
            copy['username'].error = false;
            copy['username'].errorMsg = "";
            setProfile(copy);
        }

        if(!valid){
            setSubmitting(false);
            toast.error("Greska u validaciji");
            return;
        } 
        const body = {
            name:profile.ime.value,
            username:profile.username.value
        }
        
        let copy = JSON.parse(JSON.stringify(profile)) // deep copy
        copy.ime.value = "";
        copy.email.value = "";
        copy.username.value = "";
        setProfile(copy)

        try{
            const res = await fetch('/api/user/edit',{
                    method : "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body)
                })
            if(!res.ok){
                setSubmitting(false);
                throw new Error(await res.text());
            }
            setSubmitting(false);
            toast.success("Uspesno pozlan zahtev",{
                position: toast.POSITION.TOP_RIGHT
            });
            backToProfile();
        }catch(e){
            toast.error("Greska: " + e.message);
        }
    }

    function handleChange(e) {
        const copy = { ...profile };
        copy[e.target.name].value = e.target.value;
        setProfile(copy);
    }

    function handleFocus(e) {
        const copy = { ...profile };
        copy[e.target.name].focus = true;
        setProfile(copy);
    }

    function handleBlur(e) {
        const copy = { ...profile };
        copy[e.target.name].focus = !!copy[e.target.name].value;
        setProfile(copy);
    }
  return (
    <>
    <section className={styles.contactSec}>
            <div className={styles.formContainer}>
                <form className={`${styles.contactForm} `} name="contactForm" onSubmit={handleSubmit}>
                    <div className={`${styles.inputBox} ${profile.ime.error ? styles.error : ""} ${profile.ime.focus ? styles.focus : ""}`}>
                        <label className={styles.inputLabel}>Ime i prezime</label>
                        <input value={profile.ime.value} type="text" className={styles.input1} name="ime" onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} />
                        <p className={styles.errorMessage}>{profile.ime.errorMsg}</p>
                    </div>
                    <div className={`${styles.inputBox} ${profile.email.error ?  styles.error : ""} ${profile.email.focus ? styles.focus : ""}`}>
                        <label className={styles.inputLabel}>Email</label>
                        <input value={profile.email.value} type="text" className={styles.input1} name="email" onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} disabled/>
                        <p className={styles.errorMessage}>{profile.email.errorMsg}</p>
                    </div>
                    <div className={`${styles.inputBox} ${profile.username.error ?  styles.error : ""} ${profile.username.focus ? styles.focus : ""}`}>
                        <label className={styles.inputLabel}>Username</label>
                        <input value={profile.username.value} type="text" className={styles.input1} name="username" onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} />
                        <p className={styles.errorMessage}>{profile.username.errorMsg}</p>
                    </div>
                    <div className={styles.submitButtonBox}>
                        <button type="submit"
                        className={`${styles.primaryButton} primaryButton`}
                        onClick={handleSubmit}>{"Sačuvaj izmene"}</button>

                        <button
                        onClick={backToProfile} className={`${styles.secondaryButton} secondaryButton`}
                        >{"Otkaži"}</button>
                    </div>
                </form>
            </div>
        </section>
    </>
  )
}

export default SettingsForm