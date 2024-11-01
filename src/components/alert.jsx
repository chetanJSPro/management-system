import React from 'react'

export default function Alert() {
    return (
        <div class="alert alert-success d-flex align-items-center alert-dismissible fade show" role="alert">
            ✅️

            <div>
                <strong>Success</strong> your response is successfully submitted.&#x1F44D;
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        </div>
    )
}
