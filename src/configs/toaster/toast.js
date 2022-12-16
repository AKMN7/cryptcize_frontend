function fireToast(swal, success, msg, duration = 2000) {
    swal.fire({
        icon: success ? "success" : "error",
        title: msg,
        showConfirmButton: false,
        toast: true,
        position: "top",
        timer: duration,
    });
}


function logOutPopUpOptions() {
    return {
        title: "Logout",
        text: "Are you sure you want to logout?",
        confirmButtonText: "Yes",
        confirmButtonColor: "#6e7881",
        cancelButtonColor: "#7920ff",
        showCancelButton: true,
        focusCancel: true,
    };
}


function suuportPopUpOptions() {
    return {
        title: "Support",
        input: "textarea",
        inputPlaceholder: "What's on your mind...",
        inputAttributes: {
            "aria-label": "What's on your mind",
        },
        showCancelButton: true,
        confirmButtonColor: "#7920ff",
    }
}

export default { fireToast, logOutPopUpOptions, suuportPopUpOptions }