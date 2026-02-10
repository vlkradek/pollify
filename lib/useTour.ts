'use client'

import { driver } from 'driver.js'

export function useAccountTour() {
  const startTour = () => {
    driver({
        showProgress: true,
        allowClose: true,

        nextBtnText: "Další",
        prevBtnText: "Zpět",
        doneBtnText: "Hotovo",

        progressText: "{{current}} z {{total}}",
        steps: [
            {
                element: "#create-poll",
                popover: {
                    title: "Vytvořte první anketu",
                    description: "Klikněte zde pro vytvoření nové ankety",
                },
            },
            {
                element: "#polls",
                popover: {
                    title: "Vaše ankety",
                    description: "Zde můžete spravovat své ankety",
                },
            },
            {
                element: "#logout",
                popover: {
                    title: "Odhlásit se",
                    description: "Klikněte zde pro odhlášení ze svého účtu",
                },
            },
            {
                element: "#delete-acc",
                popover: {
                    title: "Smazat účet",
                    description: "Klikněte zde pro smazání svého účtu",
                },
            },
        ],
    }).drive();
  }

  return { startTour }
}
