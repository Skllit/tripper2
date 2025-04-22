export const updateEnrollmentStatus = (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
  
    // Replace this with actual DB logic
    console.log(`Updating enrollment ${id} with status ${status}`);
  
    // Example response
    res.json({ message: `Enrollment ${id} updated to status ${status}` });
  };
  