<?php

namespace App\Controller;

use App\Entity\Computer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\ComputerRepository;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;
use Knp\Component\Pager\PaginatorInterface;

class ComputersController extends AbstractController
{
    /**
     * @Route("/api/computers", name="computers", methods={"GET"})
     */
    public function index(ComputerRepository $computerRepository, SerializerInterface $serializer,Request $request, PaginatorInterface $paginatorInterface)
    {
        $page = $request->query->get('page') ? (int) $request->query->get('page') : 1;
        $datenow   = new DateTime();
        $dateQuery = $datenow->format('Y-m-d');
        $date = $request->query->get('date') ? $request->query->get('date') : $dateQuery;
   

        $computers = $computerRepository->findAllWithPagination($date);
        // dd($computers);

        $computerPaginate = $paginatorInterface->paginate(
            $computers,  // Les données à paginé
            $page,       // Numéro de la page
            3            // Nombre d'élément par page
        );

        $json = $serializer->serialize($computerPaginate, 'json', ['groups' => 'attribution']);
        $response = new JsonResponse($json, 200, [], true);
        return $response;
    }


    /**
     * @Route("/api/computer/add", name="computer_add", methods={"POST"})
     */
    public function create(Request $request, ComputerRepository $computerRepo): Response
    {
        $data = json_decode($request->getContent(), true);
        $computerExist = $computerRepo->findOneBy(['name' => $data['name']]);

        if (!$computerExist) {
            $computer = new Computer();
            $computer->setName($data['name']);
            $doctrine = $this->getDoctrine()->getManager();
            $doctrine->persist($computer);
            $doctrine->flush();
            return $this->json($computer);
        } else {
            return $this->json(['success' => false, 'message' => 'Poste existe déjà']);
        }
    }


    /**
     * @Route("/api/computer/delete/{id}", name="computer_delete", methods={"DELETE"})
     */
    public function delete(Computer $computer, EntityManagerInterface $em): Response
    {
        $em->remove($computer);
        $em->flush();
        return $this->json([
            'success' => true,
            'message' => "Suppression réussie"
        ], 200);
    }
}
