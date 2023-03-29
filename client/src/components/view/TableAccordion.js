import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const TableAccordion = ({ summary, element }) => {
    return (
        <Accordion sx={{ border: "1px inset grey" }}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>{summary}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ maxHeight: "100rem", overflowY: 'scroll' }}>
                {element}
            </AccordionDetails>
        </Accordion>
    );
}

export default TableAccordion;