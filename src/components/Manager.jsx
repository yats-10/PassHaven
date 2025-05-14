import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
function Manager() {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setpasswordArray(JSON.parse(passwords))
        }

    }, [])

    const copyText = (text) => {
        toast('Copied to clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",

        });
        navigator.clipboard.writeText(text);
    }

    const showPassword = () => {



        if (ref.current.src.includes("icons/hidden.png")) {
            ref.current.src = "icons/eye.png"
            passwordRef.current.type = "password"
        } else {
            ref.current.src = "icons/hidden.png"
            passwordRef.current.type = "text"
        }
    }

    const savePassword = () => {
        if(form.site.length > 3 && form.username.length > 3 && form.password.length > 3){

            
            
            toast.success('Password saved 👌', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                
            });
            setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            // console.log([...passwordArray, form])
            setform({ site: "", username: "", password: "" })
        } 
        else{
            toast.error("error:Password not saved!",{
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })
        }
    }
        const deletePassword = (id) => {
        toast('Password deleted!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",

        });
        // console.log("deleting passwordpassword", id)
        let c= confirm("Do you really want to delete this password")
        if (c) {
            setpasswordArray(passwordArray.filter(item => item.id !== id))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
            // console.log([...passwordArray, form])
        }
    }
    const editPassword = (id) => {
        // console.log("editing password",id)
        setform(passwordArray.filter(i => i.id === id)[0])

        setpasswordArray(passwordArray.filter(item => item.id !== id))
        // localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
        // console.log([...passwordArray, form])
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />
            {/* Same as */}
            <ToastContainer />
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div></div>
            <div className=" md:mycontainer m-4 min-h-[80.7vh] ">
                <h1 className='text-3xl text font-bold text-center'><span className='text-green-500' >&lt;</span>
                    Pass
                    <span className='text-green-500' >Haven/&gt;</span></h1>
                <p className='text-green-900 text-center '>Your own Password Manager</p>
                <div className="text-black  gap-8  flex flex-col p-4 items-center">
                    <input value={form.site} onChange={handleChange} placeholder='Enter website URL' className='rounded-full border border-green-500 w-full p-4 py-1' type="text" name="site" id="site" />
                    <div className="flex flex-col md:flex-row w-full justify-between gap-8  ">
                        <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border border-green-500 w-full p-4 py-1
                        ' type="text" name="username" id="username" />
                        <div className="relative">
                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border border-green-500 w-full p-4 py-1
                        ' type="password" name="password" id="password" />
                            <span className='absolute right-[5px] top-[4px] cursor-pointer' onClick={showPassword}> <img ref={ref} width={23} src="icons/eye.png" alt="eye" /></span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='flex gap-2 justify-center items-center  border-2 border-green-900 bg-green-500 hover:bg-green-400 rounded-full
                     px-6 py-2 w-fit font-bold '>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover"
                            style={{ "width": "25px", "height": "25px", "paddingLeft": "3px", }}>

                        </lord-icon>Save</button>
                </div>
                <div className="passwords">
                    <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div> No passwords to show</div>}
                    {passwordArray.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden">
                        <thead className='bg-green-800 text-white'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Actions</th>

                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className='  py-2 border border-white text-center w-32'>
                                        <div className='flex justify-center items-center '>
                                            <a href={item.site} className='pl-3' target='_blank'>{item.site}</a>
                                            <div className="size-7 cursor-pointer" onClick={() => { copyText(item.site) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px", "height": "25px", "paddingLeft": "3px", "paddingTop": "3px" }}>
                                                </lord-icon>

                                            </div>
                                        </div>
                                    </td>

                                    <td className=' py-2 border border-white text-center w-32'>
                                        <div className='flex justify-center items-center '>
                                            <span>{item.username}</span>
                                            <div className="size-7 cursor-pointer" onClick={() => { copyText(item.username) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px", "height": "25px", "paddingLeft": "3px", "paddingTop": "3px" }}>
                                                </lord-icon>

                                            </div>
                                            
                                        </div></td>


                                    <td className=' py-2 border border-white text-center w-32'>
                                        <div className='flex justify-center items-center '>
                                            <span>{"*".repeat(item.password.length)}</span>
                                            <div className="size-7 cursor-pointer" onClick={() => { copyText(item.password) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px", "height": "25px", "paddingLeft": "3px", "paddingTop": "3px" }}>
                                                </lord-icon>

                                            </div>
                                        </div>
                                    </td>
                                    <td className=' py-2 border border-white text-center w-32'>
                                        <span className='cursor-pointer mx-1' onClick={() => { editPassword(item.id) }} ><lord-icon
                                            src="https://cdn.lordicon.com/gwlusjdu.json"
                                            trigger="hover"
                                            style={{ "width": "25px", "height": "25px" }}>
                                        </lord-icon>
                                        </span>
                                        <span className='cursor-pointer mx-1 ' onClick={() => { deletePassword(item.id) }}><lord-icon
                                            src="https://cdn.lordicon.com/skkahier.json"
                                            trigger="hover"
                                            style={{ "width": "25px", "height": "25px" }}>
                                        </lord-icon>
                                        </span>
                                    </td>

                                </tr>
                            })}

                        </tbody>
                    </table>
                    }
                </div>
            </div >
        </>
    )

}
export default Manager