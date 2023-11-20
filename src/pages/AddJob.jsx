import React, { useState } from "react";
import styled from "styled-components";
import { CiSquarePlus } from "react-icons/ci";

import { Job_Status, Job_Type } from "../utils/JobData";

import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";

const AddJob = () => {
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        setIsLoading(true);

        const newJob = {
            company: data?.company,
            position: data?.position,
            jobStatus: data?.status,
            jobType: data?.type,
            jobLocation: data?.location,
        };
        console.log(newJob);
        // posting
        try {
            const response = await axios.post(
                "https://hunter-backend-dun.vercel.app/api/v1/jobs",
                newJob,
                {
                    withCredentials: true,
                }
            );
            Swal.fire({
                icon: "success",
                title: "Done...",
                text: response?.data?.message,
            });

            reset();
            // navigate("/");
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error?.response?.data,
            });
        }
        setIsLoading(false);
    };

    return (
        <Wrapper>
            <div className="">
                <div className="title-row">
                    Create Job
                    <CiSquarePlus className="ml-1 text-xl md:text-2xl" />
                </div>
                <div className="content-row">
                    <form
                        className="form"
                        autoComplete="off"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        {/* Position */}
                        <div className="row">
                            <label htmlFor="position">Position</label>
                            <input
                                type="text"
                                id="position"
                                name="position"
                                placeholder="Job Position"
                                {...register("position", {
                                    required: {
                                        value: true,
                                        message: "Job Positon is required",
                                    },
                                    maxLength: {
                                        value: 100,
                                        message: "Too long (max 100char)",
                                    },
                                    minLength: {
                                        value: 3,
                                        message: "Too short (max 3char)",
                                    },
                                })}
                            />
                            {errors?.position && (
                                <span className="text-[10px] font-semibold text-red-600 mt-1 pl-1 tracking-wider">
                                    {errors?.position?.message}
                                </span>
                            )}
                        </div>

                        {/* Company */}
                        <div className="row">
                            <label htmlFor="company">Company</label>
                            <input
                                type="text"
                                id="company"
                                name="company"
                                placeholder="Company Name"
                                {...register("company", {
                                    required: {
                                        value: true,
                                        message: "Job Company is required",
                                    },
                                    maxLength: {
                                        value: 100,
                                        message: "Too long (max 100char)",
                                    },
                                    minLength: {
                                        value: 3,
                                        message: "Too short (max 3char)",
                                    },
                                })}
                            />
                            {errors?.company && (
                                <span className="text-[10px] font-semibold text-red-600 mt-1 pl-1 tracking-wider">
                                    {errors?.company?.message}
                                </span>
                            )}
                        </div>

                        {/* Location */}
                        <div className="row">
                            <label htmlFor="location">Location</label>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                placeholder="Job Location"
                                {...register("location", {
                                    required: {
                                        value: true,
                                        message: "Job Location is required",
                                    },
                                    maxLength: {
                                        value: 100,
                                        message: "Too long (max 100char)",
                                    },
                                    minLength: {
                                        value: 3,
                                        message: "Too short (max 3char)",
                                    },
                                })}
                            />
                            {errors?.location && (
                                <span className="text-[10px] font-semibold text-red-600 mt-1 pl-1 tracking-wider">
                                    {errors?.location?.message}
                                </span>
                            )}
                        </div>

                        {/* Status */}
                        <div className="row">
                            <label htmlFor="status">Job Status</label>
                            <select
                                defaultValue={"none"}
                                name="status"
                                id="stauts"
                                {...register("status", {
                                    required: {
                                        value: true,
                                        message: "Job Status is required",
                                    },
                                    validate: {
                                        valueType: (value) => {
                                            return (
                                                value !== "none" ||
                                                "Job Status is required"
                                            );
                                        },
                                    },
                                })}
                            >
                                <option disabled value="none">
                                    Select a Job Status
                                </option>

                                {Job_Status?.map((job, index) => (
                                    <option value={job} key={index + job}>
                                        {job}
                                    </option>
                                ))}
                            </select>
                            {errors?.status && (
                                <span className="text-[10px] font-semibold text-red-600 mt-1 pl-1 tracking-wider">
                                    {errors?.status?.message}
                                </span>
                            )}
                        </div>

                        {/* Type */}
                        <div className="row">
                            <label htmlFor="type">Job Type</label>
                            <select
                                defaultValue={"none"}
                                name="type"
                                id="type"
                                {...register("type", {
                                    required: {
                                        value: true,
                                        message: "Job Type is required",
                                    },
                                    validate: {
                                        valueType: (value) => {
                                            return (
                                                value !== "none" ||
                                                "Job Type is required"
                                            );
                                        },
                                    },
                                })}
                            >
                                <option disabled value="none">
                                    Select a Job Type
                                </option>
                                {Job_Type?.map((job, index) => (
                                    <option value={job} key={index + job}>
                                        {job}
                                    </option>
                                ))}
                            </select>
                            {errors?.type && (
                                <span className="text-[10px] font-semibold text-red-600 mt-1 pl-1 tracking-wider">
                                    {errors?.type?.message}
                                </span>
                            )}
                        </div>

                        <div className="row">
                            <label htmlFor="" className="invisible">
                                delete
                            </label>
                            <input
                                type="submit"
                                value="submit"
                                className="btn"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.section`
    .title-row {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: calc(0.9rem + 0.4vw);
        text-transform: capitalize;
        letter-spacing: 1px;
        font-weight: 600;
        opacity: 0.85;
        color: var(--color-black);
        position: relative;
    }
    .title-row:before {
        content: "";
        position: absolute;
        bottom: -4px;
        left: 0;
        width: calc(30px + 0.7vw);
        height: calc(2px + 0.1vw);
        background-color: var(--color-primary);
    }
    .content-row {
        margin-top: calc(2rem + 0.5vw);
    }
    .form {
        margin-top: calc(30px + 1vw);
        width: 100%;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        justify-content: space-between;
        align-items: center;
        grid-gap: calc(1rem + 0.5vw);
    }
    @media screen and (max-width: 1000px) {
        .form {
            grid-template-columns: repeat(2, 1fr);
        }
    }
    @media screen and (max-width: 600px) {
        .form {
            grid-template-columns: 1fr;
        }
    }
    .row {
        display: flex;
        flex-direction: column;
    }
    .row label {
        font-size: 11.3px;
        font-weight: 600;
        letter-spacing: 1px;
        color: var(--color-black);
        opacity: 0.95;
    }
    input,
    select {
        width: 100%;
        max-width: 500px;
        padding: 8px 14px;
        margin-top: 6px;
        display: inline-block;
        border: 1px solid #0000004a;
        border-radius: 4px;
        box-sizing: border-box;
        font-size: calc(0.8rem + 0.1vw);
        outline: none;
        color: var(--color-black);
    }
    select {
        padding-left: 2px;
        text-transform: capitalize;
    }
    input:focus,
    select:focus {
        outline: none;
        border: 1px solid #00000086;
    }
    .btn {
        width: 100%;
        max-width: 150px;
        height: 100%;
        display: inline-block;
        background-color: var(--color-black);
        color: var(--color-white);
        cursor: pointer;
        transition: all 0.3s linear;
        text-transform: capitalize;
        font-size: calc(0.9rem + 0.1vw);
    }
    .btn:hover {
        background-color: var(--color-primary);
    }
    @media screen and (max-width: 600px) {
        .btn {
            margin: 0 auto;
            margin-top: -6px;
        }
    }
`;
export default AddJob;
