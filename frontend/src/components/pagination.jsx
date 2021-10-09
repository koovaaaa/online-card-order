import React from "react";
import _ from 'lodash';

const Pagination = props => {
    const numberOfPages = Math.ceil(props.eventsCount / props.pageSize);
    if (numberOfPages === 1) return null;
    const pages = _.range(1, numberOfPages + 1);
    return <nav>
        <ul className="pagination justify-content-md-center">
            {pages.map(page =>
                <li key={page} className={page === props.currentPage ? 'page-item active' : 'page-item'}>
                    <button className="page-link"
                            onClick={async () => await props.onPageChange(page)}>{page}</button>
                </li>)}
        </ul>
    </nav>;
};

export default Pagination;