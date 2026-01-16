import React from 'react'
import Image from 'next/image'
import SectionTitle from '@/components/section-title'
import { SparkleIcon } from 'lucide-react'
import AnimatedContent from '@/components/animated-content'

const loginPage = () => {
    return (
        <AnimatedContent>
            <div className="flex h-[700px] w-full md:px-16 lg:px-24 xl:px-32">
                <div className="w-full hidden md:inline-block">
                    <img className="h-full" src="/assets/logo-colored.svg" alt="leftSideImage" />
                </div>

                <div className="w-full flex flex-col items-center justify-center">

                    <SectionTitle
                        dir="left"
                        icon={SparkleIcon}
                        title="Sign In"
                        subtitle="Welcome back! Please sign in to continue"
                    />
                    <AnimatedContent>
                        <form className="md:w-96 w-80 flex flex-col items-center justify-center">
                            <div className="mt-10 mb-2 grid w-full grid-cols-3 gap-6">
                                <button type="button" className="flex items-center justify-center rounded-full border border-gray-200 py-2.5 hover:bg-gray-50 focus:border-gray-300 cursor-pointer">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_8755_1278)">
                                            <path d="M12 9.81836V14.4656H18.4582C18.1746 15.9602 17.3236 17.2257 16.0472 18.0766L19.9417 21.0984C22.2108 19.0039 23.5199 15.9276 23.5199 12.273C23.5199 11.4221 23.4436 10.6039 23.3017 9.81849L12 9.81836Z" fill="#4285F4" />
                                            <path d="M5.27657 14.2842L4.3982 14.9566L1.28906 17.3783C3.2636 21.2947 7.31058 24.0002 12.0014 24.0002C15.2414 24.0002 17.9577 22.9311 19.9432 21.0984L16.0487 18.0765C14.9796 18.7965 13.6159 19.2329 12.0014 19.2329C8.88146 19.2329 6.23063 17.1275 5.28147 14.2911L5.27657 14.2842Z" fill="#34A853" />
                                            <path d="M1.28718 6.62207C0.469042 8.23655 0 10.0584 0 12.0002C0 13.942 0.469042 15.7638 1.28718 17.3783C1.28718 17.3891 5.27997 14.2801 5.27997 14.2801C5.03998 13.5601 4.89812 12.7965 4.89812 12.0001C4.89812 11.2036 5.03998 10.44 5.27997 9.72L1.28718 6.62207Z" fill="#FBBC05" />
                                            <path d="M12.0017 4.77818C13.769 4.77818 15.3399 5.38907 16.5944 6.56727L20.0307 3.13095C17.9471 1.18917 15.2417 0 12.0017 0C7.31082 0 3.2636 2.69454 1.28906 6.62183L5.28174 9.72001C6.23077 6.88362 8.88171 4.77818 12.0017 4.77818Z" fill="#EA4335" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_8755_1278">
                                                <rect width="24" height="24" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </button>
                                <button type="button" className="flex items-center justify-center rounded-full border border-gray-200 py-2.5 hover:bg-gray-50 focus:border-gray-300 cursor-pointer">
                                    <svg width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_8755_1275)">
                                            <path d="M16.7855 1.9043H19.8757L13.1245 10.3278L21.0667 21.7903H14.848L9.9773 14.8383L4.40409 21.7903H1.31202L8.53308 12.7804L0.914062 1.9043H7.29065L11.6934 8.25863L16.7855 1.9043ZM15.7009 19.7711H17.4132L6.36022 3.81743H4.52273L15.7009 19.7711Z" fill="black" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_8755_1275">
                                                <rect width="21.9847" height="24" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </button>
                                <button type="button" className="flex items-center justify-center rounded-full border border-gray-200 py-2.5 hover:bg-gray-50 focus:border-gray-300 cursor-pointer">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_8755_1272)">
                                            <path d="M24 12C24 5.37264 18.6274 0 12 0C5.37264 0 0 5.37264 0 12C0 17.6275 3.87456 22.3498 9.10128 23.6467V15.6672H6.62688V12H9.10128V10.4198C9.10128 6.33552 10.9498 4.4424 14.9597 4.4424C15.72 4.4424 17.0318 4.59168 17.5685 4.74048V8.06448C17.2853 8.03472 16.7933 8.01984 16.1822 8.01984C14.2147 8.01984 13.4544 8.76528 13.4544 10.703V12H17.3741L16.7006 15.6672H13.4544V23.9122C19.3963 23.1946 24.0005 18.1354 24.0005 12H24Z" fill="#0866FF" />
                                            <path d="M16.6988 15.6672L17.3722 12H13.4525V10.703C13.4525 8.76526 14.2128 8.01982 16.1804 8.01982C16.7914 8.01982 17.2834 8.0347 17.5666 8.06446V4.74046C17.03 4.59118 15.7181 4.44238 14.9578 4.44238C10.9479 4.44238 9.0994 6.3355 9.0994 10.4198V12H6.625V15.6672H9.0994V23.6467C10.0277 23.8771 10.9988 24 11.9981 24C12.4901 24 12.9754 23.9697 13.452 23.9121V15.6672H16.6983H16.6988Z" fill="white" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_8755_1272">
                                                <rect width="24" height="24" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </button>
                            </div>


                            <div className="flex items-center gap-4 w-full my-5">
                                <div className="w-full h-px bg-gray-300/90"></div>
                                <p className="w-full text-nowrap text-sm text-gray-500/90">or sign in with email</p>
                                <div className="w-full h-px bg-gray-300/90"></div>
                            </div>

                            <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
                                <svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z" fill="#6B7280" />
                                </svg>
                                <input type="email" placeholder="Email id" className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full" required />
                            </div>

                            <div className="flex items-center mt-6 w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
                                <svg width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z" fill="#6B7280" />
                                </svg>
                                <input type="password" placeholder="Password" className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full" required />
                            </div>

                            <div className="w-full flex items-center justify-between mt-8 text-gray-500/80">
                                <div className="flex items-center gap-2">
                                    <input className="h-5" type="checkbox" id="checkbox" />
                                    <label className="text-sm text-orange-500" htmlFor="checkbox">Remember me</label>
                                </div>
                                <a className="text-sm underline" href="#">Forgot password?</a>
                            </div>

                            <button type="submit" className="mt-8 w-full h-11 border border-orange-200 bg-linear-to-tl from-orange-600 to-orange-500 text-white text-center rounded-full">
                                Login
                            </button>
                            <p className="text-gray-500/90 text-sm mt-4">Don’t have an account? <a className="text-indigo-400 hover:underline" href="#">Sign up</a></p>
                        </form>
                    </AnimatedContent>
                </div>
            </div>
        </AnimatedContent>
    )
}

export default loginPage
