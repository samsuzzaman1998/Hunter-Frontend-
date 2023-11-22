import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { TfiLocationPin } from "react-icons/tfi";
import { BsFillBriefcaseFill } from "react-icons/bs";
import { TbTargetArrow } from "react-icons/tb";
import { FaRegCalendarAlt } from "react-icons/fa";

import advancedFormat from "dayjs/plugin/advancedFormat";
import dayjs from "dayjs";
dayjs.extend(advancedFormat);

const JobCard = ({ job }) => {
    // console.log(job);
    const date = dayjs(job?.createdAt).format("MMM Do, YYYY");
    return (
        <Wrapper>
            <div className="card-container">
                <div className="card-header">
                    <div className="logo">
                        {/* <img src="" alt="" /> */}
                        <span>{job.company.charAt(1)}</span>
                    </div>
                    <div className="right">
                        <h2 className="title">{job?.position}</h2>
                        <h4 className="company">- {job?.company}</h4>
                    </div>
                </div>
                <div className="middle-row">
                    <div className="location" title="Posted at">
                        <FaRegCalendarAlt className="mr-2 text-lg" />
                        <span className="">{date}</span>
                    </div>
                    <div className="location">
                        <TfiLocationPin className="mr-2 text-lg" />
                        <span className="">{job?.jobLocation}</span>
                    </div>
                    <div className="type">
                        <BsFillBriefcaseFill className="mr-2 text-lg" />
                        <span className="capitalize">{job?.jobType}</span>
                    </div>
                    <div className="status capitalize">
                        <TbTargetArrow className="mr-2 text-lg" />
                        <span className={job?.jobStatus}>{job?.jobStatus}</span>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    max-width: 400px;
    margin: 0 auto;
    .card-container {
        height: 100%;
        box-shadow: 0 4px 4px var(--shadow-medium),
            0 -2px 6px var(--shadow-medium);
        border-radius: 4px;
        padding: 2rem 1.5rem;
    }
    .card-container .card-header {
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .card-container .logo {
        margin-right: 18px;
        width: 50px;
        height: 50px;
        border-radius: 3px;
        background-color: #fb891f;
        display: flex;
        justify-content: center;
        align-items: center;
        /* optional */
        color: var(--color-white);
        font-size: 30px;
        font-weight: 700;
        text-transform: uppercase;
    }
    .right .title {
        text-transform: capitalize;
        font-size: calc(14px + 0.3vw);
        font-weight: 600;
        color: var(--color-black);
        line-height: 25px;
    }
    .right .company {
        display: inline-block;
        text-transform: capitalize;
        font-size: calc(11px + 0.1vw);
        font-weight: 600;
        color: var(--color-black);
        letter-spacing: 1px;
        padding: 1px 2px;
        border-radius: 4px;
    }

    .middle-row {
        margin-top: 20px;
        display: grid;
        grid-template-columns: 1fr;
        grid-row-gap: calc(0.6rem + 0.09vw);
        align-items: center;
    }

    .location,
    .type,
    .status {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: 14px;
    }

    .status span {
        background-color: #fefe7d;
        padding: 2px 15px;
        border-radius: 6px;
        text-transform: uppercase;
        font-size: 12.5px;
        font-weight: 400;
        letter-spacing: 1px;
    }
    .status span.pending {
        background-color: #fefe7d;
    }
    .status span.declined {
        background-color: #feb69a;
    }
    .status span.interview {
        background-color: #a0ffa3;
    }
`;
export default JobCard;