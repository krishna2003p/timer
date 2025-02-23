# ⏳ Timer App Assignment

Welcome to the **Timer App Assignment**! This project is designed to evaluate your **React development** skills, focusing on UI implementation, code quality, state management, and best practices.  

The app is built using **React, Vite, Tailwind CSS, Zustand (for state management), and Vitest (for testing)**.

---

## **🎯 Objective**
Your goal is to enhance and refine an existing Timer App by addressing key issues and extending its functionality. The app currently has a partially implemented timer system, and you will improve it based on the following tasks.

---

## **🛠 Tech Stack**
- **Frontend Framework**: React (with Vite for fast development)
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Testing Framework**: Vitest (for unit and component testing)
- **Icons**: Lucide-React

---

## **📌 Tasks to Complete**

### **1️⃣ UI Enhancement**
- Ensure the app's UI matches the provided **screenshots**.
- Improve spacing, margins, and overall design consistency.

### **2️⃣ Support for Multiple Timers**
- Modify the app to allow **multiple timers** to run simultaneously instead of just one.

### **3️⃣ Snack Bar Notification for Timer Completion**
- When a timer completes:
  - A **snack bar notification** should appear.
  - The **alarm sound should continue** until the user dismisses the notification.

### **4️⃣ Fix Console Errors**
- Resolve the **console error** that occurs when dismissing the snack bar notification.

### **5️⃣ Extract Reusable Components**
- Convert **common buttons** (e.g., "Add Timer", "Save Changes") into a **reusable component**.
- Use this component across the app.

### **6️⃣ Consolidate Add & Edit Timer Modals**
- Merge the **AddTimerModal** and **EditTimerModal** into a single, reusable **TimerModal** component.

### **7️⃣ Form Validation Feedback**
- Instead of disabling the **Submit** button for invalid forms, display an **error snack bar** to inform users of validation issues.

### **8️⃣ Responsive Snack Bar Placement**
- On **desktop**: Display snack bars in the **top-right corner**.
- On **mobile**: Display snack bars at the **bottom of the screen**.

### **9️⃣ Testing**
- Add **unit tests** for `validation.ts` to verify form validation rules.
- Write **component tests** for reusable components like `TimerItem` and `ModalButtons`.

### **🔟 Timer Persistence**
- Use **localStorage** to ensure timers persist across page refreshes.

---

## **📂 Project Setup**

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/CW-Codewalnut/timer.git
cd timer
