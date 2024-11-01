'use server';

import { load } from 'outstatic/server';
import LandingContactForm from '../../components/forms/LandingContactForm';

const HomePage = async function () {
    const db = await load();
    const blocks = await db
        .find({ collection: 'blocks', slug: { $regex: /^landing-/ } }, [
            'title',
            'slug',
            'content',
            'buttonText',
            'buttonLink',
        ])
        .toArray();
    console.log('BLCCKS ARE', blocks);
    return (
        <div className="w-full flex flex-col flex-1">
            <div
                className="hero"
                style={{
                    backgroundImage: 'url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)',
                }}
            >
                <div className="hero-overlay bg-opacity-60" />
                <div className="hero-content text-neutral-content text-center py-16">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold text-center">Hello there</h1>
                        <p className="mb-5">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                        <button type="button" className="btn btn-primary">
                            Get Started
                        </button>
                    </div>
                </div>
            </div>
            <div className="hero bg-base-200">
                <div className="hero-content p-4 lg:p-8 flex-col lg:flex-row w-full justify-between items-center lg:items-start">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold text-center lg:text-left">Fuck this shit!</h1>
                        <p className="py-6">Are you tried of:</p>
                        <ul className="list-disc ml-4">
                            <li>This</li>
                            <li>That</li>
                            <li>And that too</li>
                        </ul>
                        <p>Then check out that nice CTA over to the right</p>
                    </div>
                    <div className="card bg-base-100 lg:max-w-sm w-full shrink-0 shadow-2xl">
                        {/* <form className="card-body"> */}
                        {/*    <div className="form-control"> */}
                        {/*        <label className="label"> */}
                        {/*            <span className="label-text">Email</span> */}
                        {/*        </label> */}
                        {/*        <input type="email" placeholder="email" className="input input-bordered" required /> */}
                        {/*    </div> */}
                        {/*    <div className="form-control"> */}
                        {/*        <label className="label"> */}
                        {/*            <span className="label-text">Name</span> */}
                        {/*        </label> */}
                        {/*        <input type="text" placeholder="name" className="input input-bordered" required /> */}
                        {/*    </div> */}
                        {/*    <div className="form-control"> */}
                        {/*        <label className="label"> */}
                        {/*            <span className="label-text">Comments</span> */}
                        {/*        </label> */}
                        {/*        <textarea */}
                        {/*            placeholder="Commend on other issues you might have had" */}
                        {/*            className="textarea textarea-bordered h-24" */}
                        {/*        /> */}
                        {/*    </div> */}
                        {/*    <div className="form-control mt-6"> */}
                        {/*        <button className="btn btn-primary">Subscribe</button> */}
                        {/*    </div> */}
                        {/* </form> */}
                        <LandingContactForm />
                    </div>
                </div>
            </div>
            <div className="hero bg-info">
                <div className="hero-content text-center w-full flex flex-col">
                    <h1 className="text-5xl font-bold text-center">Who the F are we</h1>
                    <div className="diff aspect-[2/1] lg:aspect-[6/1] w-full">
                        <div className="diff-item-1">
                            <div className="bg-base-200 grid text-9xl font-black">
                                <div className="card card-side flex-row-reverse">
                                    <div className="flex flex-row-reverse pr-4 w-1/2">
                                        <figure className="avatar">
                                            <div className="mask mask-squircle w-24">
                                                <img src="https://media.licdn.com/dms/image/v2/C5603AQEbn0t16FCDcA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1610366167181?e=1735776000&v=beta&t=zI0VYIk-BaxlSXRykUQgKnbOqgxoj1ysIO1z2SyeuPk" />
                                            </div>
                                        </figure>
                                        <div className="card-body text-right items-end justify-center">
                                            <h2 className="card-title">Alan Kesselmann</h2>
                                            <p className="grow-0">CTO</p>
                                        </div>
                                    </div>
                                    <div className="card-body w-1/2 items-end">
                                        <ul className="list-disc ml-4">
                                            <li>5 years of this experience</li>
                                            <li>15 years of that experience</li>
                                            <li>super cool guy</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="diff-item-2">
                            <div className="bg-primary text-primary-content grid text-9xl font-black">
                                <div className="card card-side w-full">
                                    <div className="flex flex-row pl-4 w-1/2">
                                        <figure className="avatar">
                                            <div className="mask mask-squircle w-24">
                                                <img src="https://media.licdn.com/dms/image/v2/D4D03AQH7PHnkSql1tA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1707807681599?e=1735776000&v=beta&t=objWcuowLDHJX3ErfKU50GDBfdTRgszUu85Y5u7KYFw" />
                                            </div>
                                        </figure>
                                        <div className="card-body text-left items-start justify-center">
                                            <h2 className="card-title">Sander Mättas</h2>
                                            <p className="grow-0">CPO</p>
                                        </div>
                                    </div>
                                    <div className="card-body text-left w-1/2">
                                        <ul className="list-disc ml-4">
                                            <li>5 years of this experience</li>
                                            <li>15 years of that experience</li>
                                            <li>super cool guy</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="diff-resizer w-1/2" />
                    </div>
                    <p className="py-6 max-w-md">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                </div>
            </div>
            <footer className="footer footer-center bg-base-200 text-base-content rounded p-10">
                {/* <nav className="grid grid-flow-col gap-4"> */}
                {/*    <a className="link link-hover">About us</a> */}
                {/*    <a className="link link-hover">Contact</a> */}
                {/*    <a className="link link-hover">Jobs</a> */}
                {/*    <a className="link link-hover">Press kit</a> */}
                {/* </nav> */}
                {/* <nav> */}
                {/*    <div className="grid grid-flow-col gap-4"> */}
                {/*        <a> */}
                {/*            <svg */}
                {/*                xmlns="http://www.w3.org/2000/svg" */}
                {/*                width="24" */}
                {/*                height="24" */}
                {/*                viewBox="0 0 24 24" */}
                {/*                className="fill-current" */}
                {/*            > */}
                {/*                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /> */}
                {/*            </svg> */}
                {/*        </a> */}
                {/*        <a> */}
                {/*            <svg */}
                {/*                xmlns="http://www.w3.org/2000/svg" */}
                {/*                width="24" */}
                {/*                height="24" */}
                {/*                viewBox="0 0 24 24" */}
                {/*                className="fill-current" */}
                {/*            > */}
                {/*                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" /> */}
                {/*            </svg> */}
                {/*        </a> */}
                {/*        <a> */}
                {/*            <svg */}
                {/*                xmlns="http://www.w3.org/2000/svg" */}
                {/*                width="24" */}
                {/*                height="24" */}
                {/*                viewBox="0 0 24 24" */}
                {/*                className="fill-current" */}
                {/*            > */}
                {/*                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /> */}
                {/*            </svg> */}
                {/*        </a> */}
                {/*    </div> */}
                {/* </nav> */}
                <aside>
                    <p className="text-sm">Copyright © {new Date().getFullYear()} - All right reserved by OLEM</p>
                </aside>
            </footer>
        </div>
    );
};

export default HomePage;
