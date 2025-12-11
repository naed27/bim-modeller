import useCheckMobileScreen from "@/hooks/use-check-mobile";
import usePrivateAccessLayoutAuthorizer from "./use-private-access-layout-authorizer"

export default function usePrivateAccessLayoutLogic() {

    const isMobile = useCheckMobileScreen();
    usePrivateAccessLayoutAuthorizer()

    return {
        isMobile
    }
}