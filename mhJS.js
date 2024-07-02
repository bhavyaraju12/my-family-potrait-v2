const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ia3BsbWZwZXJqdGVndWdjd3p6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTgxNzQzMDUsImV4cCI6MjAzMzc1MDMwNX0.u52UJNzNT3jEhLQCVfzyeqxSCVwlYgdT538pqDB9Ap0";
const url = "https://nbkplmfperjtegugcwzz.supabase.co";
const database = supabase.createClient(url, key);

window.onload = async function () {
    // Fetch user's information
    const { data: users, error: usersError } = await database
        .from('users')
        .select('*')
        .eq('id', 3); // Replace '1' with the logged-in user's ID

    if (usersError) {
        console.error("Error fetching user:", usersError);
        return;
    }

    // Display user's information
    const user = users[0]; // Assuming there's only one user with the given ID
    document.querySelector('.user-profile .text-lg').textContent = user.name;
    document.querySelector('.user-profile .text-sm').textContent = `Email: ${user.email}`;
    // Populate other user details in a similar manner

    // Fetch user's additional information (from Patient Form)
    const { data: patientForms, error: patientFormsError } = await database
        .from('Patient Form')
        .select('*')
        .eq('user_id', user.id);

    if (patientFormsError) {
        console.error("Error fetching patient forms:", patientFormsError);
        return; 
    }

    // Display patient form information
    const patientForm = patientForms[0]; // Assuming there's only one form per user
    // Populate patient form details in the HTML table (as shown in the HTML structure)

    // Fetch relatives' information
    const { data: relatives, error: relativesError } = await database
        .from('relatives')
        .select('*')
        .eq('user_id', user.id); // Assuming 'user_id' links to the user in 'users' table

    if (relativesError) {
        console.error("Error fetching relatives:", relativesError);
        return;
    }

    // Display relatives' information
    const relativesContainer = document.querySelector('.relatives-information');
    relatives.forEach(relative => {
        const relativeCard = document.createElement('div');
        relativeCard.classList.add('relative-card', 'mb-4', 'bg-white', 'p-4', 'rounded-lg', 'shadow-md');
        relativeCard.innerHTML = `
            <div class="flex items-center mb-2">
                <img src="${relative.photo}" alt="Relative Photo" class="w-12 h-12 rounded-full mr-4">
                <div>
                    <p class="text-lg font-semibold">${relative.name}</p>
                    <p class="text-sm text-gray-600">Relationship: ${relative.relationship}</p>
                </div>
            </div>
            <table class="table-auto w-full">
                <tbody>
                    <tr>
                        <td class="font-semibold">Height (cm):</td>
                        <td>${relative.height}</td>
                    </tr>
                    <tr>
                        <td class="font-semibold">Weight (kg):</td>
                        <td>${relative.weight}</td>
                    </tr>
                    <tr>
                        <td class="font-semibold">Medical Conditions:</td>
                        <td>${relative.medical_conditions.join(', ')}</td>
                    </tr>
                    <tr>
                        <td class="font-semibold">Age:</td>
                        <td>${relative.age}</td>
                    </tr>
                </tbody>
            </table>
            <button class="bg-blue-500 text-white font-semibold px-4 py-2 rounded hover:bg-blue-600 mt-2">Update</button>
        `;
        relativesContainer.appendChild(relativeCard);
    });
};
