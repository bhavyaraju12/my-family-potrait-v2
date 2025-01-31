const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ia3BsbWZwZXJqdGVndWdjd3p6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTgxNzQzMDUsImV4cCI6MjAzMzc1MDMwNX0.u52UJNzNT3jEhLQCVfzyeqxSCVwlYgdT538pqDB9Ap0";
const url = "https://nbkplmfperjtegugcwzz.supabase.co";
const database = supabase.createClient(url, key);

console.log(database);

const  form_submit= document.getElementById("form_submit");

form_submit.addEventListener("submit", async (event) => { // Use login_submit here
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Check if all fields are filled
    if (!email || !password) {
        alert("All fields must be filled out!");
        return; // Stop form submission
    }

    try {
        // First, check the 'users' table
        let { data: user, error: userError } = await database
            .from('users')
            .select()
            .eq('email', email)
            .single();

        if (userError) {       
            // If there's an error in the query, log it and try the next table
            console.error("Error checking users table:", userError);
        }

        // If user is found and password matches
        if (user && user.password === password) {
            alert("Login successful!");
            // Redirect to the dashboard or another page
            window.location.href = "dashboard.html";
            return;
        }

        // If not found or password doesn't match, check the 'doctors' table
        let { data: doctor, error: doctorError } = await database
            .from('doctors')
            .select()
            .eq('email', email)
            .single();

        if (doctorError) {
            console.error("Error checking doctors table:", doctorError);
        }

        // If doctor is found and password matches
        if (doctor && doctor.password === password) {
            alert("Login successful!");
            const doctorId = doctor.d_id;
            localStorage.setItem('doctorId', doctorId);
            // Redirect to the dashboard or another page
            window.location.href = "docdb.html";
        } else {
            alert("Invalid email or password.");
        }
    } catch (error) {
        console.error("Error logging in:", error);
        alert("There was an error logging in. Please try again.");
    }
});
