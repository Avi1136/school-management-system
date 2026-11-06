// Simulated Database Records for Tenants & Users
const MOCK_DATABASE = {
  // Admin Credentials
  "ADMIN101": {
    password: "admin789",
    user: {
      id: "ADMIN101",
      name: "Principal Arthur Pendelton",
      role: "ADMIN",
      permissions: [
        "view_dashboard",
        "view_profile",
        "view_updates",
        "manage_website",
        "view_calendar",
        "manage_admissions",
        "view_students",
        "view_staff",
        "view_attendance",
        "manage_fees",
        "view_alerts",
        "view_timetable",
        "manage_exams",
        "manage_evaluations",
        "manage_reports"
      ]
    },
    school: {
      schoolCode: "EMET101",
      name: "EMET Mohanpur Public School",
      logo: "/src/assets/images/school-logo.png",
      academicYear: "2026-2027"
    }
  },

  // Parent Credentials
  "PARENT101": {
    password: "admin789",
    user: {
      id: "PARENT101",
      name: "Robert Smith (Parent of Leo Smith - Gr. 8)",
      role: "PARENT",
      permissions: [
        "view_dashboard",
        "view_profile",
        "view_updates",
        "view_calendar",
        "view_child_attendance",
        "view_child_fees",
        "pay_fees",
        "view_timetable",
        "view_exam_results"
      ]
    },
    school: {
      schoolCode: "EMET101",
      name: "EMET Mohanpur Public School",
      logo: "/src/assets/images/school-logo.png",
      academicYear: "2026-2027"
    }
  }
};

export const authService = {
  login: async (schoolCode, username, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const record = MOCK_DATABASE[username.toUpperCase()];

        if (!record || record.password !== password) {
          return reject({ message: "Invalid ID or Password. Try 'ADMIN101' or 'PARENT101' with password 'admin789'." });
        }

        // Store tokens locally
        localStorage.setItem("token", `mock-jwt-token-${record.user.id}`);
        localStorage.setItem("userData", JSON.stringify(record.user));
        localStorage.setItem("schoolData", JSON.stringify(record.school));

        resolve({
          user: record.user,
          school: record.school,
          token: `mock-jwt-token-${record.user.id}`
        });
      }, 500); // Simulated delay
    });
  },

  logout: () => {
    localStorage.clear();
  }
};